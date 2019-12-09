import path from 'path';
import fs from 'fs';
import { plugins } from '../../tools/rollup/css-config';

const COMPONENTS_PATH = path.resolve(__dirname, 'src');
const componentsWithStyles = fs
  .readdirSync(COMPONENTS_PATH)
  .filter(component => fs.existsSync(path.resolve(COMPONENTS_PATH, component, 'styles')));

export default componentsWithStyles.map(component => ({
  input: `./src/${component}/styles/index.ts`,
  output: [
    {
      file: `./dist/${component}/styles/index.js`,
      format: 'cjs'
    },
    {
      file: `./dist/esm/${component}/styles/index.js`,
      format: 'esm'
    }
  ],
  plugins
}));
