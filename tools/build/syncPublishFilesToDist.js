const { exec } = require('child_process');

const { PWD } = process.env;

exec(`rsync -ar --exclude-from=${PWD}/.npmignore ${PWD}/ ${PWD}/dist`);
