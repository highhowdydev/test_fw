import path from 'node:path';
import CONFIG from '../config.js';
import ora from 'ora';
import {exec} from 'node:child_process';
import {promisify} from 'node:util';
import fs from 'node:fs';
import {ensureDirectoryExists, sanitizePath} from '../lib/utils.js';

const execAsync = promisify(exec);

async function configureAssetLinks() {
    const spinner = ora();

    try {
        const outputDir = sanitizePath(path.join(CONFIG.RESOURCE_DIR, '[assets]'));
        ensureDirectoryExists(outputDir);

        for (const asset of CONFIG.ASSETS) {
            const dir = sanitizePath(path.join(CONFIG.ASSETS_DIR, asset.dir));
            if (!fs.existsSync(dir)) continue;

            const targetDir = sanitizePath(path.join(outputDir, asset.targetDir));
            ensureDirectoryExists(targetDir);

            spinner.info(`${dir} -> ${targetDir}`);
            await execAsync(`mklink /J "${outputDir}/${asset.targetDir}" "${dir}"`);
        }

        spinner.succeed('Asset links have been configured');
    } catch (error) {
        spinner.fail('Failed to configure asset links');
        console.error(error);
        process.exit(1);
    }
}

configureAssetLinks();
