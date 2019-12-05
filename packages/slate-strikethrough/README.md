<div align="center">
  <img
    src="https://raw.githubusercontent.com/ianstormtaylor/slate/master/docs/images/banner.png"
    height="200"
  />
</div>

<h1 align="center">@artibox/slate-strikethrough</h1>

<div align="center">

[Slate](https://github.com/ianstormtaylor/slate) strikethrough.

[![npm package](https://img.shields.io/npm/v/@artibox/slate-strikethrough.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-strikethrough)
[![npm downloads](https://img.shields.io/npm/dt/@artibox/slate-strikethrough.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-strikethrough)

</div>

## Installation

```bash
npm install @artibox/slate-strikethrough --save

or

$ yarn add @artibox/slate-strikethrough
```

## Usage

### Editor

```js
import React from 'react';
import { Strikethrough as StrikethroughIcon } from '@artibox/icons';
import { createArtiboxEditor } from '@artibox/slate-editor';
import { Toolbar } from '@artibox/slate-toolbar';
import { createStrikethrough } from '@artibox/slate-strikethrough';

const Strikethrough = createStrikethrough();

const plugins = [
  Strikethrough.forPlugin(),
  Toolbar.forPlugin({
    expandedTools: [{ icon: StrikethroughIcon, hook: Strikethrough.forToolHook() }]
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
import { createStrikethroughJsxSerializerRule } from '@artibox/slate-strikethrough';

const jsxSerializer = createJsxSerializer({
  marks: [
    createStrikethroughJsxSerializerRule()
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

This package is based on based on [@artibox/slate-toggle-mark](../slate-toggle-mark/README.md).

- [constants](./src/constants.ts)
- [createStrikethrough](./src/strikethrough.ts)
- [createStrikethroughJsxSerializerRule](./src/jsx-serializer.ts)

## Hotkey

| OS                       | Shortcut                                    |
| ------------------------ | ------------------------------------------- |
| ![Apple Logo][apple]     | <kbd>⌘</kbd>+<kbd>⌥</kbd>+<kbd>s</kbd>      |
| ![Windows Logo][windows] | <kbd>ctrl</kbd>+<kbd>alt</kbd>+<kbd>s</kbd> |

[apple]: https://cdn2.iconfinder.com/data/icons/designer-skills/128/apple-ios-system-platform-os-mac-linux-48.png
[windows]: https://cdn2.iconfinder.com/data/icons/designer-skills/128/windows-48.png
