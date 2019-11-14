module.exports = {
  '*.@(js|jsx|ts|tsx)': ['prettier --write', 'yarn lint:ts --fix', 'git add'],
  '*.@(css|sass|scss)': ['prettier --write', 'yarn lint:css --fix', 'git add'],
  '*.@(json|md)': ['prettier --write', 'git add']
};
