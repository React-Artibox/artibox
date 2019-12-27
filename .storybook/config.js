import { configure, addParameters } from '@storybook/react';

addParameters({
  options: {
    theme: {
      base: 'light'
    }
  }
});

configure(require.context('../stories', true, /\.stories\.tsx?$/), module);
