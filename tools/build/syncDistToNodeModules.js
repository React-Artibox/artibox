const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const { PWD, npm_package_name } = process.env;

const NODE_MODULES_PATH = path.resolve(__dirname, '..', '..', 'node_modules');

let packagePath = NODE_MODULES_PATH;

npm_package_name.split('/').forEach(dir => {
  packagePath = path.resolve(packagePath, dir);

  if (!fs.existsSync(packagePath)) {
    exec(`mkdir ${packagePath}`);
  }
});

exec(`rsync -ar --exclude-from=${PWD}/.npmignore ${PWD}/dist/ ${packagePath}`);
