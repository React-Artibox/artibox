import { DocsPage } from '@storybook/addon-docs/blocks';
import { addDecorator, addParameters } from '@storybook/react';

addParameters({
  docs: { page: DocsPage }
});
