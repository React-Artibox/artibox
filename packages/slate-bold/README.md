<div align="center">
  <img
    src="https://raw.githubusercontent.com/ianstormtaylor/slate/master/docs/images/banner.png"
    height="200"
  />
</div>

<h1 align="center">@artibox/slate-bold</h1>

<div align="center">

[Slate](https://github.com/ianstormtaylor/slate) bold.

[![npm package](https://img.shields.io/npm/v/@artibox/slate-bold.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-bold)
[![npm downloads](https://img.shields.io/npm/dt/@artibox/slate-bold.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-bold)

</div>

## Installation

```bash
npm install @artibox/slate-bold --save

or

$ yarn add @artibox/slate-bold
```

## Usage

### Editor

```js
import React from 'react';
import { Bold as BoldIcon } from '@artibox/icons';
import { createArtiboxEditor } from '@artibox/slate-editor';
import { Toolbar } from '@artibox/slate-toolbar';
import { createBold } from '@artibox/slate-bold';

const Bold = createBold();

const plugins = [
  Bold.forPlugin(),
  Toolbar.forPlugin({
    expandedTools: [{ icon: BoldIcon, hook: Bold.forToolHook() }]
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
import { createBoldJsxSerializerRule } from '@artibox/slate-bold';

const jsxSerializer = createJsxSerializer({
  marks: [
    createBoldJsxSerializerRule()
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
- [createBold](./src/bold.ts)
- [createBoldJsxSerializerRule](./src/jsx-serializer.ts)

## Hotkey

| OS                       | Shortcut                     |
| ------------------------ | ---------------------------- |
| ![Apple Logo][apple]     | <kbd>⌘</kbd>+<kbd>b</kbd>    |
| ![Windows Logo][windows] | <kbd>ctrl</kbd>+<kbd>b</kbd> |

[apple]: https://cdn2.iconfinder.com/data/icons/designer-skills/128/apple-ios-system-platform-os-mac-linux-48.png
[windows]: https://cdn2.iconfinder.com/data/icons/designer-skills/128/windows-48.png
