import { plugins } from '../../tools/rollup/css-config';

export default [
  {
    input: './src/styles/index.ts',
    output: [
      {
        file: './dist/styles/index.js',
        format: 'cjs'
      },
      {
        file: './dist/esm/styles/index.js',
        format: 'esm'
      }
    ],
    plugins
  }
];
