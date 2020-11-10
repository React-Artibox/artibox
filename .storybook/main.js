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
  stories: [
    '../stories/docs/intro.stories.mdx',
    '../stories/docs/getting-started.stories.mdx',
    '../stories/docs/guide.stories.mdx',
    '../stories/docs/theme.stories.mdx',
    '../stories/docs/locale.stories.mdx',
    '../stories/docs/icons.stories.mdx',
    '../stories/docs/utils/intro.stories.mdx',
    '../stories/docs/utils/*.stories.mdx',
    '../stories/examples/playground.stories.tsx',
    '../stories/**/*.stories.(tsx|mdx)'
  ],
  addons: ['@storybook/addon-knobs', '@storybook/addon-docs/preset'],
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
    config.resolve.alias = { ...config.resolve.alias, ...alias };
    return config;
  }
};
