import CONFIG from '../config.js';
import path from 'node:path';
import fs from 'node:fs';
import plugin from 'esbuild-plugin-fileloc';
import esbuild from 'esbuild';
import {globSync, sanitizePath, copySync} from './utils.js';

// Builds a resource, including its server and client components
export async function buildResource(resource, spinner, dev) {
    try {
        spinner.text = `Building ${path.basename(resource)}`;

        const hasServer = fs.existsSync(sanitizePath(path.join(resource, 'server')));
        const hasClient = fs.existsSync(sanitizePath(path.join(resource, 'client')));

        const promises = [copyResourceFiles(resource)];

        if (hasServer) promises.push(buildEntry(resource, dev, 'server', 'cjs'));
        if (hasClient) promises.push(buildEntry(resource, dev, 'client', 'iife'));

        return await Promise.all(promises);
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to build ${path.basename(resource)}`);
    }
}

// Builds a specific entry point (server or client)
function buildEntry(resource, dev, entryType, targetFormat) {
    const indexPath = sanitizePath(path.join(resource, `${entryType}/index.ts`));
    const targetPath = sanitizePath(
        path.join(
            resource.replace(CONFIG.SOURCE_DIR, CONFIG.OUTPUT_DIR),
            `${entryType}/index.${targetFormat}`,
        ),
    );

    const esbuildOpts = {
        platform: entryType === 'server' ? 'node' : 'browser',
        entryPoints: [indexPath],
        outfile: targetPath,
        target: ['esnext'],
        format: targetFormat,
        bundle: true,
        sourcemap: dev,
        logLevel: 'info',
        plugins: [plugin.filelocPlugin()],
    };

    return dev ? esbuild.context(esbuildOpts).watch() : esbuild.build(esbuildOpts);
}

// Copies static files from the source directory to the output directory
export async function copyResourceFiles(resource) {
    const files = globSync(path.join(resource, '**/*'), {
        nodir: true,
        ignore: ['**/node_modules/**', '**/tsconfig.json', '**/*.ts', '**/*.tsx'],
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
    const files = globSync(path.join(resourcePath, '*'), {
        nodir: true,
    });

    const fileNames = files.map((file) => path.basename(file));

    for (const disabler of CONFIG.RESOURCE_DISABLERS) if (fileNames.includes(disabler)) return true;

    return false;
}

// Fetches a list of enabled resources from the source directory
export function fetchResources() {
    return globSync(path.join(CONFIG.SOURCE_DIR, '*'), {
        onlyDirectories: true,
    }).filter((resource) => {
        return !isResourceDisabled(resource);
    });
}
