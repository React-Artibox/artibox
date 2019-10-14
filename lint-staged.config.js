module.exports = {
  '*.@(js|jsx|ts|tsx)': ['prettier --write', 'yarn lint --fix', 'git add']
};
