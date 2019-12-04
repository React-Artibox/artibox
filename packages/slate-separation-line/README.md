<div align="center">
  <img
    src="https://raw.githubusercontent.com/ianstormtaylor/slate/master/docs/images/banner.png"
    height="200"
  />
</div>

<h1 align="center">@artibox/slate-separation-line</h1>

<div align="center">

[Slate](https://github.com/ianstormtaylor/slate) separation line.

[![npm package](https://img.shields.io/npm/v/@artibox/slate-separation-line.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-separation-line)
[![npm downloads](https://img.shields.io/npm/dt/@artibox/slate-separation-line.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-separation-line)

</div>

## Installation

```bash
npm install @artibox/slate-separation-line --save

or

$ yarn add @artibox/slate-separation-line
```

## Usage

### Editor

```js
import React from 'react';
import { SeparationLine as SeparationLineIcon } from '@artibox/icons';
import { createArtiboxEditor } from '@artibox/slate-editor';
import { Toolbar } from '@artibox/slate-toolbar';
import { createSeparationLine } from '@artibox/slate-separation-line';

const SeparationLine = createSeparationLine();

const plugins = [
  SeparationLine.forPlugin(),
  Toolbar.forPlugin({
    collapsedTools: [{ icon: SeparationLine, hook: SeparationLine.forToolHook() }]
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
import { createSeparationLineJsxSerializerRule } from '@artibox/slate-separation-line';

const jsxSerializer = createJsxSerializer({
  blocks: [
    createSeparationLineJsxSerializerRule()
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
- [createSeparationLine](./src/separation-line.ts#L17)
- [createSeparationLineJsxSerializerRule](./src/jsx-serializer.ts)
- [SeparationLine.forPlugin](./src/separation-line.ts#L23)
- [SeparationLine.forToolHook](./src/separation-line.ts#L30)
- [SeparationLineController](./src/controller.ts#L5)
