<div align="center">
  <img
    src="https://raw.githubusercontent.com/ianstormtaylor/slate/master/docs/images/banner.png"
    height="200"
  />
</div>

<h1 align="center">@artibox/slate-highlight</h1>

<div align="center">

[Slate](https://github.com/ianstormtaylor/slate) highlight.

[![npm package](https://img.shields.io/npm/v/@artibox/slate-highlight.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-highlight)
[![npm downloads](https://img.shields.io/npm/dt/@artibox/slate-highlight.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-highlight)

</div>

## Installation

```bash
npm install @artibox/slate-highlight --save

or

$ yarn add @artibox/slate-highlight
```

## Usage

### Editor

```js
import React from 'react';
import { Highlight as HighlightIcon } from '@artibox/icons';
import { createArtiboxEditor } from '@artibox/slate-editor';
import { Toolbar } from '@artibox/slate-toolbar';
import { createHighlight } from '@artibox/slate-highlight';

const Highlight = createHighlight();

const plugins = [
  Highlight.forPlugin(),
  Toolbar.forPlugin({
    expandedTools: [{ icon: HighlightIcon, hook: Highlight.forToolHook() }]
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
import { createHighlightJsxSerializerRule } from '@artibox/slate-highlight';

const value = ...;  //  from editor

const jsxSerializer = createJsxSerializer({
  marks: [
    createHighlightJsxSerializerRule()
  ]
});
```

## API

This package is based on based on [@artibox/slate-toggle-mark](../slate-toggle-mark/README.md).

- [constants](./src/constants.ts)
- [createHighlight](./src/highlight.ts)
- [createHighlightJsxSerializerRule](./src/jsx-serializer.ts)

## Hotkey

| OS                       | Shortcut                     |
| ------------------------ | ---------------------------- |
| ![Apple Logo][apple]     | <kbd>⌘</kbd>+<kbd>i</kbd>    |
| ![Windows Logo][windows] | <kbd>ctrl</kbd>+<kbd>i</kbd> |

[apple]: https://cdn2.iconfinder.com/data/icons/designer-skills/128/apple-ios-system-platform-os-mac-linux-48.png
[windows]: https://cdn2.iconfinder.com/data/icons/designer-skills/128/windows-48.png
