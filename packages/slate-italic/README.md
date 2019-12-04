<div align="center">
  <img
    src="https://raw.githubusercontent.com/ianstormtaylor/slate/master/docs/images/banner.png"
    height="200"
  />
</div>

<h1 align="center">@artibox/slate-italic</h1>

<div align="center">

[Slate](https://github.com/ianstormtaylor/slate) italic.

[![npm package](https://img.shields.io/npm/v/@artibox/slate-italic.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-italic)
[![npm downloads](https://img.shields.io/npm/dt/@artibox/slate-italic.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-italic)

</div>

## Installation

```bash
npm install @artibox/slate-italic --save

or

$ yarn add @artibox/slate-italic
```

## Usage

### Editor

```js
import React from 'react';
import { Italic as ItalicIcon } from '@artibox/icons';
import { createArtiboxEditor } from '@artibox/slate-editor';
import { Toolbar } from '@artibox/slate-toolbar';
import { createItalic } from '@artibox/slate-italic';

const Italic = createItalic();

const plugins = [
  Italic.forPlugin(),
  Toolbar.forPlugin({
    expandedTools: [{ icon: ItalicIcon, hook: Italic.forToolHook() }]
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
import { createItalicJsxSerializerRule } from '@artibox/slate-italic';

const jsxSerializer = createJsxSerializer({
  marks: [
    createItalicJsxSerializerRule()
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

This package is based on based on [@artibox/slate-toggle-mark](../slate-toggle-mark/README.md).

- [constants](./src/constants.ts)
- [createItalic](./src/italic.ts)
- [createItalicJsxSerializerRule](./src/jsx-serializer.ts)

## Hotkey

| OS                       | Shortcut                     |
| ------------------------ | ---------------------------- |
| ![Apple Logo][apple]     | <kbd>⌘</kbd>+<kbd>i</kbd>    |
| ![Windows Logo][windows] | <kbd>ctrl</kbd>+<kbd>i</kbd> |

[apple]: https://cdn2.iconfinder.com/data/icons/designer-skills/128/apple-ios-system-platform-os-mac-linux-48.png
[windows]: https://cdn2.iconfinder.com/data/icons/designer-skills/128/windows-48.png
