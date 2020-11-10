import path from 'path';
import fs from 'fs';
import { plugins } from '../../tools/rollup/cssConfig';

function getStyleFilesOfDirectories(dir, rootDir = dir) {
  return fs.readdirSync(dir).reduce((acc, name) => {
    const currentPath = path.resolve(dir, name);
    const stat = fs.lstatSync(currentPath);

    if (stat.isDirectory()) {
      acc.push(...getStyleFilesOfDirectories(currentPath, rootDir));
    } else if (stat.isFile() && /.styles.ts$/.test(name)) {
      acc.push(path.relative(rootDir, currentPath));
    }

    return acc;
  }, []);
}

export default getStyleFilesOfDirectories(path.resolve(__dirname, 'src')).map(filePath => {
  const outputPath = filePath.replace('.ts', '.js');

  return {
    input: `./src/${filePath}`,
    output: [
      {
        file: `./dist/${outputPath}`,
        format: 'cjs'
      },
      {
        file: `./dist/esm/${outputPath}`,
        format: 'esm'
      }
    ],
    plugins
  };
});
