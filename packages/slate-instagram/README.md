<div align="center">
  <img
    src="https://raw.githubusercontent.com/ianstormtaylor/slate/master/docs/images/banner.png"
    height="200"
  />
</div>

<h1 align="center">@artibox/slate-instagram</h1>

<div align="center">

[Slate](https://github.com/ianstormtaylor/slate) instagram.

[![npm package](https://img.shields.io/npm/v/@artibox/slate-instagram.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-instagram)
[![npm downloads](https://img.shields.io/npm/dt/@artibox/slate-instagram.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-instagram)

</div>

## Installation

```bash
npm install @artibox/slate-instagram --save

or

$ yarn add @artibox/slate-instagram
```

## Usage

### Editor

```js
import React from 'react';
import { Instagram as InstagramIcon } from '@artibox/icons';
import { createArtiboxEditor } from '@artibox/slate-editor';
import { Toolbar } from '@artibox/slate-toolbar';
import { createInstagram } from '@artibox/slate-instagram';

const Instagram = createInstagram();

const plugins = [
  Instagram.forPlugin(),
  Toolbar.forPlugin({
    collapsedTools: [{ icon: InstagramIcon, hook: Instagram.forToolHook() }]
  })
];

const Editor = createArtiboxEditor({
  plugins
});

export default Editor;
```

### Jsx Serializer

```ts
import { createJsxSerializer } from '@artibox/slate-jsx-serializer';
import { createInstagramJsxSerializerRule } from '@artibox/slate-instagram';

const value = ...;  //  from editor

const jsxSerializer = createJsxSerializer({
  marks: [
    createInstagramJsxSerializerRule()
  ]
});
```

## API

- [constants](./src/constants.ts)
- [typings](./src/typings.ts)
- [createInstagram](./src/instagram.ts#L25)
- [createInstagramJsxSerializerRule](./src/jsx-serializer.ts)
- [Instagram.forPlugin](./src/instagram.ts#L31)
- [Instagram.forToolHook](./src/instagram.ts#L38)
- [InstagramController](./src/controller.ts#L7)

### Utils

- [getInstagramPropsFromBlock](./src/utils/get-instagram-props-from-block.ts)
- [getInstagramUrlFromEmbedCode](./src/utils/get-instagram-url-from-embed-code.ts)
- [createInstagramBlock](./src/utils/create-instagram-block.ts)
- [loadInstagramApi](./src/utils/load-instagram-api.ts)

### Components

- [Instagram](./src/components/instagram.tsx)
