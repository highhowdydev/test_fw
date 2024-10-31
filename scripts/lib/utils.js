import {glob} from 'glob';
import fs, {rmSync} from 'node:fs';

/**
 * Sanitizes path by replacing backslashes with forward slashes
 * Ensures cross-platform compatibility.
 *
 * @param {string} path - The path to sanitize
 * @returns {string} The sanitized path
 */
function sanitizePath(path) {
    return path.replace(/\\/g, '/');
}

/**
 * Ensures that a directory and its parent directories exist.
 * If the directory doesn't exist, it will be created recursively.
 *
 * @param {string} path - The path to ensure exists
 */
function ensureDirectoryExists(path) {
    const directory = sanitizePath(path.split('/').slice(0, -1).join('/'));
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, {recursive: true});
    }
}

function globSync(path, options = {}) {
    return glob.sync(sanitizePath(path), {...options}).map((filePath) => sanitizePath(filePath));
}

/**
 * Copies a file or directory recursively to a destination path.
 *
 * @param {string} source - The source path.
 * @param {string} destination - The destination path.
 */
function copySync(source, destination) {
    source = sanitizePath(source);
    destination = sanitizePath(destination);

    ensureDirectoryExists(destination);

    fs.cpSync(source, destination, {
        force: true,
        recursive: true,
    });
}

/**
 * Writes data to a file, creating the necessary directories if they don't exist.
 * If the file already exists, it will be overwritten.
 *
 * @param {string} path - The path to the file.
 * @param {string|Buffer} data - The data to write to the file.
 */
function writeFile(path, data) {
    path = sanitizePath(path);
    ensureDirectoryExists(path);
    rmSync(path, {force: true, maxRetries: 999});
    fs.writeFileSync(path, data);
}

export {globSync, copySync, writeFile, sanitizePath, ensureDirectoryExists};
