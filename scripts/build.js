import 'dotenv/config';
import ora from 'ora';
import {buildResource, fetchResources} from './lib/resource.js';

const spinner = ora();
const isDev = process.env.dev === '1';

async function main() {
    try {
        spinner.start('Building resources...');

        const jobs = [];
        const resources = fetchResources();

        for (const resource of resources) jobs.push(buildResource(resource, spinner, isDev));
        await Promise.all(jobs);

        spinner.succeed('Resources have been built!');

        if (isDev) {
            spinner.start('Watching for changes...');
        } else {
            process.exit(0);
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();
