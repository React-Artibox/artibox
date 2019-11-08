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
  }
];
