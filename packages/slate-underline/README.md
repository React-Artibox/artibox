<div align="center">
  <img
    src="https://raw.githubusercontent.com/ianstormtaylor/slate/master/docs/images/banner.png"
    height="200"
  />
</div>

<h1 align="center">@artibox/slate-underline</h1>

<div align="center">

[Slate](https://github.com/ianstormtaylor/slate) underline.

[![npm package](https://img.shields.io/npm/v/@artibox/slate-underline.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-underline)
[![npm downloads](https://img.shields.io/npm/dt/@artibox/slate-underline.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-underline)

</div>

## Installation

```bash
npm install @artibox/slate-underline --save

or

$ yarn add @artibox/slate-underline
```

## Usage

### Editor

```js
import React from 'react';
import { Underline as UnderlineIcon } from '@artibox/icons';
import { createArtiboxEditor } from '@artibox/slate-editor';
import { Toolbar } from '@artibox/slate-toolbar';
import { createUnderline } from '@artibox/slate-underline';

const Underline = createUnderline();

const plugins = [
  Underline.forPlugin(),
  Toolbar.forPlugin({
    expandedTools: [{ icon: UnderlineIcon, hook: Underline.forToolHook() }]
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
import { createUnderlineJsxSerializerRule } from '@artibox/slate-underline';

const value = ...;  //  from editor

const jsxSerializer = createJsxSerializer({
  marks: [
    createUnderlineJsxSerializerRule()
  ]
});
```

## API

This package is based on based on [@artibox/slate-toggle-mark](../slate-toggle-mark/README.md).

- [constants](./src/constants.ts)
- [createUnderline](./src/underline.ts)
- [createUnderlineJsxSerializerRule](./src/jsx-serializer.ts)

## Hotkey

| OS                       | Shortcut                     |
| ------------------------ | ---------------------------- |
| ![Apple Logo][apple]     | <kbd>⌘</kbd>+<kbd>i</kbd>    |
| ![Windows Logo][windows] | <kbd>ctrl</kbd>+<kbd>i</kbd> |

[apple]: https://cdn2.iconfinder.com/data/icons/designer-skills/128/apple-ios-system-platform-os-mac-linux-48.png
[windows]: https://cdn2.iconfinder.com/data/icons/designer-skills/128/windows-48.png
