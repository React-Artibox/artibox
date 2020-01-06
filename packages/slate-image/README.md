<div align="center">
  <img
    src="https://raw.githubusercontent.com/ianstormtaylor/slate/master/docs/images/banner.png"
    height="200"
  />
</div>

<h1 align="center">@artibox/slate-image</h1>

<div align="center">

[Slate](https://github.com/ianstormtaylor/slate) image.

[![npm package](https://img.shields.io/npm/v/@artibox/slate-image.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-image)
[![npm downloads](https://img.shields.io/npm/dt/@artibox/slate-image.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-image)

</div>

## Installation

```bash
npm install @artibox/slate-image --save

or

$ yarn add @artibox/slate-image
```

## Usage

### Editor

```js
import React from 'react';
import { Image as ImageIcon } from '@artibox/icons';
import { createArtiboxEditor } from '@artibox/slate-editor';
import { createImage } from '@artibox/slate-image';
import { Toolbar } from '@artibox/slate-toolbar';

const Image = createImage();

const plugins = [
  Image.forPlugin(),
  Toolbar.forPlugin({
    collapsedTools: [{ icon: Image, hook: Image.forToolHook() }]
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
import { createImageJsxSerializerRule } from '@artibox/slate-image';

const jsxSerializer = createJsxSerializer({
  blocks: [
    createImageJsxSerializerRule()
  ]
});

...

return (
  <div>
    {jsxSerializer(valueJSON /* from slate */)}
  </div>
);
```

## API

- [constants](./src/constants.ts)
- [typings](./src/typings.ts)
- [createImage](./src/image.ts#L17)
- [createImageJsxSerializerRule](./src/jsx-serializer.ts)
- [Image.forPlugin](./src/image.ts#L26)
- [Image.forToolHook](./src/image.ts#L34)
- [ImageController](./src/controller.ts#L7)

### Utils

- [getImagePropsFromBlock](./src/utils/get-image-props-from-block.ts)
- [getImageSrcFromBlock](./src/utils/get-image-src-from-block.ts)
- [getImageStyleFromBlock](./src/utils/get-image-style-from-block.ts)

### Components

- [Image](./src/components/image/index.tsx) - Default component only for renderer of editor since it provide resizer.
