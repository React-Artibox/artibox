module.exports = {
  '*.@(js|jsx|ts|tsx)': ['prettier --write', 'eslint --config .eslintrc --ext .js,.jsx,.ts,.tsx --fix'],
  '*.@(css|sass|scss)': ['prettier --write', 'stylelint --config .stylelintrc --fix'],
  '*.@(json|md)': ['prettier --write']
};
