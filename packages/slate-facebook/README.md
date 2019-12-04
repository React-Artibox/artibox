<div align="center">
  <img
    src="https://raw.githubusercontent.com/ianstormtaylor/slate/master/docs/images/banner.png"
    height="200"
  />
</div>

<h1 align="center">@artibox/slate-facebook</h1>

<div align="center">

[Slate](https://github.com/ianstormtaylor/slate) facebook.

[![npm package](https://img.shields.io/npm/v/@artibox/slate-facebook.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-facebook)
[![npm downloads](https://img.shields.io/npm/dt/@artibox/slate-facebook.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-facebook)

</div>

## Installation

```bash
npm install @artibox/slate-facebook --save

or

$ yarn add @artibox/slate-facebook
```

## Usage

### Editor

```js
import React from 'react';
import { Facebook as FacebookIcon } from '@artibox/icons';
import { createArtiboxEditor } from '@artibox/slate-editor';
import { Toolbar } from '@artibox/slate-toolbar';
import { createFacebook } from '@artibox/slate-facebook';

const Facebook = createFacebook();

const plugins = [
  Facebook.forPlugin(),
  Toolbar.forPlugin({
    collapsedTools: [{ icon: FacebookIcon, hook: Facebook.forToolHook() }]
  })
];

const Editor = createArtiboxEditor({
  plugins
});

export default Editor;
```

### Jsx Serializer

```tsx
import { createJsxSerializer } from '@artibox/slate-jsx-serializer';
import { createFacebookJsxSerializerRule } from '@artibox/slate-facebook';

const jsxSerializer = createJsxSerializer({
  blocks: [
    createFacebookJsxSerializerRule()
  ]
});

...

return (
  <div>
    {jsxSerializer(value /* from slate */)}
  </div>
);
```

## API

- [constants](./src/constants.ts)
- [typings](./src/typings.ts)
- [createFacebook](./src/facebook.ts#L22)
- [createFacebookJsxSerializerRule](./src/jsx-serializer.ts)
- [Facebook.forPlugin](./src/facebook.ts#L31)
- [Facebook.forToolHook](./src/facebook.ts#L38)
- [FacebookController](./src/controller.ts#L7)

### Utils

- [getFacebookEmbedDataFromBlock](./src/utils/get-facebook-embed-data-from-block.ts)
- [getFacebookEmbedDataFromHtml](./src/utils/get-facebook-embed-data-from-html.ts)
- [getSrcFromFacebookEmbedData](./src/utils/get-src-from-facebook-embed-data.ts)
- [createFacebookBlock](./src/utils/create-facebook-block.ts)

### Components

- [Facebook](./src/components/facebook.tsx)
