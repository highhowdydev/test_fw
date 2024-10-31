import {sanitizePath} from './lib/utils.js';
import path from 'node:path';

export default {
    RESOURCE_DISABLERS: ['disabled', 'disable', 'exclude', 'remove'],
    SERVER: {
        NAME: 'Eleventh Hour',
        PROJECT_NAME: 'evh-framework',
        PROJECT_DESC: 'Eleventh Hour Framework',
        LOCALE: 'en',
        GAME_BUILD: '3095',
        ARTIFACE_BUILD: 'latest',
        MAX_CLIENTS: 8,
        MODE: 'development',
    },
    SERVER_TAGS: ['roleplay', 'custom'],
    RESOURCES: ['[fivem]', 'evh-base'],
    ASSET_LINKS: ['[maps]', '[vehicles]', '[weapons]'],
    ADMINS: ['steam:11000010db8c83a'],
    EXTRAS: [
        'set onesync true',
        'set onesync_population true',
        'set onesync_workaround763185 true',
        'set onesync_forceMigration true',
        'set onesync_distanceCullVehicles true',
    ],
    ASSETS: [
        {dir: 'maps', targetDir: '[maps]'},
        {dir: 'vehicles', targetDir: '[vehicles]'},
        {dir: 'weapons', targetDir: '[weapons]'},
    ],
    SOURCE_DIR: sanitizePath(path.join(process.cwd(), 'src')),
    RESOURCE_DIR: sanitizePath(path.join(process.cwd(), 'resources')),
    OUTPUT_DIR: sanitizePath(path.join(process.cwd(), 'resources', '[build]')),
    CFX_DIR: sanitizePath(path.join(process.cwd(), 'artifacts')),
    ASSETS_DIR: sanitizePath(path.join(process.cwd(), 'assets')),
    SERVER_CFG_PATH: sanitizePath(path.join(process.cwd(), 'server.cfg')),
};
