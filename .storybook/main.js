const path = require('path');
const fs = require('fs');

const ROOT_PATH = path.resolve(__dirname, '..');
const PACKAGES_PATH = path.resolve(ROOT_PATH, 'packages');
const STORIES_PATH = path.resolve(ROOT_PATH, 'stories');
const STORY_BOOK_TS_CONFIG_PATH = path.resolve(__dirname, 'tsconfig.json');

const packages = fs.readdirSync(PACKAGES_PATH);
const packagesAlias = packages.reduce((acc, package) => {
  acc[`@artibox/${package}`] = path.resolve(PACKAGES_PATH, package, 'src');
  return acc;
}, {});
const alias = { ...packagesAlias };

module.exports = {
  stories: ['../stories/**/*.@(tsx|mdx)'],
  addons: ['@storybook/addon-knobs', '@storybook/addon-docs/preset', '@storybook/addon-storysource'],
  webpackFinal: config => {
    config.module.rules.push(
      {
        test: /\.(ts|tsx)$/,
        include: [PACKAGES_PATH, STORIES_PATH],
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: STORY_BOOK_TS_CONFIG_PATH
            }
          },
          {
            loader: 'react-docgen-typescript-loader',
            options: {
              tsconfigPath: path.resolve(STORIES_PATH, 'tsconfig.json')
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/,
        include: [PACKAGES_PATH, STORIES_PATH],
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    );
    config.resolve.alias = { ...config.resolve.alias, ...alias };
    return config;
  }
};
