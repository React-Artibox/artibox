const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const PACKAGE_PATH = path.resolve(__dirname, '..');
const SRC_PATH = path.resolve(PACKAGE_PATH, 'src');

fs.readdirSync(SRC_PATH).filter(file => {
  const result = /(.*)\.scss/g.exec(file);

  if (!result) {
    return;
  }

  const [, themeName] = result;
  const filePath = path.resolve(SRC_PATH, file);
  const buildPath = path.resolve(PACKAGE_PATH, 'prebuilts', `${themeName}.css`);

  exec(`npx node-sass ${filePath} ${buildPath}`);
});
