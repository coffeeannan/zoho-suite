import { $ } from 'bun';
import { rmSync, existsSync, mkdirSync } from 'fs';

async function build() {
  console.log('Cleaning dist directory...');
  if (existsSync('dist')) {
    rmSync('dist', { recursive: true });
  }
  mkdirSync('dist', { recursive: true });

  console.log('Building ESM bundle...');
  await Bun.build({
    entrypoints: ['./src/index.ts'],
    outdir: './dist',
    target: 'node',
    format: 'esm',
    sourcemap: 'external',
    minify: false,
    splitting: false,
  });

  console.log('Building CJS bundle...');
  await Bun.build({
    entrypoints: ['./src/index.ts'],
    outdir: './dist',
    target: 'node',
    format: 'cjs',
    sourcemap: 'external',
    minify: false,
    naming: '[dir]/index.cjs',
  });

  // Build resources if they exist
  if (existsSync('src/resources')) {
    console.log('Building resources...');
    await Bun.build({
      entrypoints: ['./src/resources/index.ts'],
      outdir: './dist/resources',
      target: 'node',
      format: 'esm',
      sourcemap: 'external',
      minify: false,
    });
  }

  console.log('Generating TypeScript declarations...');
  await $`bun x tsc --emitDeclarationOnly`;

  console.log('✅ Build complete!');
}

build().catch(console.error);
