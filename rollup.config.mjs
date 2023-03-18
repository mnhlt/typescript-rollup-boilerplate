import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import pkg from './package.json' assert { type: "json" };

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const plugins = [
  json(),
  nodeResolve({ extensions }),
  typescript()
];

export default [
  {
    input: 'src/index.ts',
    external: [
      Object.keys(pkg.dependencies || {}),
      Object.keys(pkg.peerDependencies || {}),
    ].flat(),
    output: [
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
      {
        file: pkg.browser,
        format: 'cjs',
        sourcemap: true,
      }
    ],
    plugins,
  },
  {
    input: 'src/main.ts',
    external: [
      Object.keys(pkg.dependencies || {}),
      Object.keys(pkg.peerDependencies || {}),
    ].flat(),
    output: [
      {
        file: pkg.bin,
        format: 'es',
        banner: '#!/usr/bin/env node',
        sourcemap: false,
      },
    ],
    plugins: [...plugins],
  },
];
