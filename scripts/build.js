import "dotenv/config";
import ora from "ora";
import { buildResource, fetchResources } from "./lib/resource.js";
import minimist from "minimist";
import { splitString } from "./lib/utils.js";

const spinner = ora();

async function main() {
	try {
		const jobs = [];
		const { target, w, watch } = minimist(process.argv.slice(2));
		const resources = fetchResources(splitString(target));

		if (!resources.length) {
			spinner.fail("No resources found!");
			process.exit(1);
		}

		const watchResources = w || watch;

		for (const resource of resources) jobs.push(buildResource(resource, spinner, watchResources));
		await Promise.all(jobs);

		spinner.succeed("Resources have been built!");

		if (watchResources) spinner.start("Watching for changes...");
		else process.exit(0);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

main();
