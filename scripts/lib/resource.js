import CONFIG from "../config.js";
import path from "node:path";
import fs from "node:fs";
import plugin from "esbuild-plugin-fileloc";
import esbuild from "esbuild";
import { globSync, sanitizePath, copySync } from "./utils.js";
import { escape } from "node:querystring";

// Builds a resource, including its server and client components
export async function buildResource(resource, spinner, dev) {
	try {
		spinner.text = `Building ${path.basename(resource)}`;

		const hasServer = fs.existsSync(sanitizePath(path.join(resource, "server")));
		const hasClient = fs.existsSync(sanitizePath(path.join(resource, "client")));

		const promises = [copyResourceFiles(resource)];

		if (hasServer) promises.push(buildEntry(resource, dev, "server", "cjs"));
		if (hasClient) promises.push(buildEntry(resource, dev, "client", "iife"));

		return await Promise.all(promises);
	} catch (error) {
		console.error(error);
	}
}

// Builds a specific entry point (server or client)
async function buildEntry(resource, dev, entryType, targetFormat) {
	const indexPath = sanitizePath(path.join(resource, `${entryType}/index.ts`));
	const targetPath = sanitizePath(
		path.join(resource.replace(CONFIG.SOURCE_DIR, CONFIG.OUTPUT_DIR), `${entryType}/index.js`),
	);

	const esbuildOpts = {
		platform: entryType === "server" ? "node" : "browser",
		entryPoints: [indexPath],
		outfile: targetPath,
		target: ["esnext"],
		format: targetFormat,
		bundle: true,
		sourcemap: dev,
		logLevel: "info",
		plugins: [plugin.filelocPlugin()],
	};

	if (dev) {
		const ctx = await esbuild.context(esbuildOpts);
		ctx.watch();
		return;
	}

	await esbuild.build(esbuildOpts);
}

// Copies static files from the source directory to the output directory
export async function copyResourceFiles(resource) {
	const files = globSync(path.join(resource, "**/*"), {
		nodir: true,
		ignore: ["**/node_modules/**", "**/tsconfig.json", "**/*.ts", "**/*.tsx"],
	});

	for (const file of files) {
		const target = file.replace(CONFIG.SOURCE_DIR, CONFIG.OUTPUT_DIR);
		if (file === target) continue;
		copySync(file, target);
	}
}

// Checks if a resource is disabled from building based on specific file existence
// Check ../config.js for a list of disablers
export function isResourceDisabled(resourcePath) {
	const files = globSync(path.join(resourcePath, "*"), {
		nodir: true,
	});

	const fileNames = files.map(file => path.basename(file));

	for (const disabler of CONFIG.RESOURCE_DISABLERS) if (fileNames.includes(disabler)) return true;

	return false;
}

function getResourceName(resource) {
	return resource.split("/").pop();
}

function isResourceCategory(directory) {
	return !fs.existsSync(path.join(directory, "fxmanifest.lua"));
}

// Fetches a list of enabled resources from the source directory
export function fetchResources(resources, currentDir = CONFIG.SOURCE_DIR) {
	const foundResources = globSync(path.join(currentDir, "*"), {
		onlyDirectories: true,
	}).filter(resource => {
		if (resources.length && !resources.includes(getResourceName(resource)) && !isResourceCategory(resource)) return false;
		return !isResourceDisabled(resource);
	});

	const recursiveResources = [];

	for (const resource of foundResources) {
		if (!isResourceCategory(resource) && !isResourceDisabled(resource)) continue;
		recursiveResources.push(...fetchResources(resources, resource));
		foundResources.splice(foundResources.indexOf(resource), 1);
	}

	const resourcesToBuild = [...foundResources, ...recursiveResources];

	return resourcesToBuild;
}
