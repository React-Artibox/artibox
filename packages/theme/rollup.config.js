import path from 'path';
import fs from 'fs';
import { plugins } from '../../tools/rollup/css-config';

const THEMES_PATH = path.resolve(__dirname, 'src');
const themes = fs
  .readdirSync(THEMES_PATH)
  .filter(theme => fs.existsSync(path.resolve(THEMES_PATH, theme, `${theme}.scss`)));

export default themes.map(theme => ({
  input: `./src/${theme}/index.ts`,
  output: [
    {
      file: `./dist/${theme}/index.js`,
      format: 'cjs'
    },
    {
      file: `./dist/esm/${theme}/index.js`,
      format: 'esm'
    }
  ],
  plugins
}));
