import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'light',
  brandTitle: 'Artibox',
  brandUrl: 'https://github.com/React-Artibox/artibox'
});

addons.setConfig({
  theme,
  panelPosition: 'right',
  showRoots: true
});
