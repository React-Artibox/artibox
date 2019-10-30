const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '..');
const PACKAGES_PATH = path.resolve(ROOT_PATH, 'packages');
const STORIES_PATH = path.resolve(ROOT_PATH, 'stories');

const packages = ['slate-core', 'slate-editor', 'slate-plugin-hotkey', 'slate-plugin-toggle-mark', 'slate-plugin-bold'];
const packagesAlias = packages.reduce((acc, package) => {
  acc[`@artibox/${package}`] = path.resolve(PACKAGES_PATH, package, 'src');
  return acc;
}, {});
const alias = { ...packagesAlias };

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [PACKAGES_PATH, STORIES_PATH],
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
        options: {
          configFileName: './.storybook/tsconfig.json'
        }
      },
      {
        loader: require.resolve('react-docgen-typescript-loader')
      }
    ]
  });

  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.alias = alias;

  return config;
};
