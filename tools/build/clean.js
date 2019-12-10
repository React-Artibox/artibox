const path = require('path');
const { exec } = require('child_process');

const { PWD, npm_package_name } = process.env;

const PACKAGE_PATH = path.resolve(__dirname, '..', '..', 'node_modules', npm_package_name);

exec(`rm -rf ${PWD}/{dist,*.tsbuildinfo} && rm -rf ${PACKAGE_PATH}`);
