import { plugins } from '../../tools/rollup/css-config';

export default [
  {
    input: './src/styles/index.ts',
    output: [
      {
        file: './lib/styles/index.js',
        format: 'cjs'
      },
      {
        file: './esm/styles/index.js',
        format: 'esm'
      }
    ],
    plugins
  }
];
