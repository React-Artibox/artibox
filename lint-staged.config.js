module.exports = {
  '*.@(js|jsx|ts|tsx)': ['prettier --write', 'yarn lint:ts --fix'],
  '*.@(css|sass|scss)': ['prettier --write', 'yarn lint:css --fix'],
  '*.@(json|md)': ['prettier --write']
};
