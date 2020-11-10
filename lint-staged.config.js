module.exports = {
  '*.@(js|jsx|ts|tsx|mdx)': ['prettier --write', 'eslint --config .eslintrc --ext .js,.jsx,.ts,.tsx,.mdx --fix'],
  '*.@(css|sass|scss)': ['prettier --write', 'stylelint --config .stylelintrc --fix'],
  '*.@(json|md)': ['prettier --write']
};
