const path = require('path');
const fs = require('fs');

const ROOT_PATH = path.resolve(__dirname, '..');
const PACKAGES_PATH = path.resolve(ROOT_PATH, 'packages');
const STORIES_PATH = path.resolve(ROOT_PATH, 'stories');

const packages = fs.readdirSync(PACKAGES_PATH);
const packagesAlias = packages.reduce((acc, package) => {
  acc[`@artibox/${package}`] = path.resolve(PACKAGES_PATH, package, 'src');
  return acc;
}, {});
const alias = { ...packagesAlias };

module.exports = ({ config }) => {
  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      include: [PACKAGES_PATH, STORIES_PATH],
      use: [
        {
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: './.storybook/tsconfig.json'
          }
        },
        {
          loader: 'react-docgen-typescript-loader'
        }
      ]
    },
    {
      test: /\.s[ac]ss$/,
      include: [PACKAGES_PATH, STORIES_PATH],
      use: ['style-loader', 'css-loader', 'sass-loader']
    }
  );

  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.alias = alias;

  return config;
};
