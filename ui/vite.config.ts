import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

const BUILD_DIR = sanitizePath(path.join(process.cwd(), 'src', 'evh-ui', 'web'));

function sanitizePath(path: string) {
    return path.replace(/\\/g, '/');
}

export default defineConfig(({ mode }) => {
    const isProduction = process.env.NODE_ENV === 'production';
    const base = isProduction ? '/web' : '/';

    return {
        plugins: [react()],
        base,
        build: {
            outDir: path.join(BUILD_DIR),
            emptyOutDir: true,
            reportCompressedSize: false,
        },
    };
});