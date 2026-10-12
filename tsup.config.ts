import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'], // Build for commonJS and ESmodules
    // tsup injects baseUrl into the DTS build, which TypeScript 6 deprecates
    dts: { compilerOptions: { ignoreDeprecations: '6.0' } }, // Generate declaration file (.d.ts)
    splitting: false,
    sourcemap: true,
    clean: true,
});
