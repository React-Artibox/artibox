import { plugins } from './css-config';

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: './lib/index.js',
        format: 'cjs'
      }
    ],
    plugins
  },
  {
    input: './src/index.ts',
    output: [
      {
        file: './esm/index.js',
        format: 'es'
      }
    ],
    plugins
  }
];
