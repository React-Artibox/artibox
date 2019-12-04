<div align="center">
  <img
    src="https://raw.githubusercontent.com/ianstormtaylor/slate/master/docs/images/banner.png"
    height="200"
  />
</div>

<h1 align="center">@artibox/slate-heading</h1>

<div align="center">

[Slate](https://github.com/ianstormtaylor/slate) heading.

[![npm package](https://img.shields.io/npm/v/@artibox/slate-heading.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-heading)
[![npm downloads](https://img.shields.io/npm/dt/@artibox/slate-heading.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-heading)

</div>

## Installation

```bash
npm install @artibox/slate-heading --save

or

$ yarn add @artibox/slate-heading
```

## Usage

### Editor

```js
import React from 'react';
import { Heading1, Heading2, Heading3 } from '@artibox/icons';
import { createArtiboxEditor } from '@artibox/slate-editor';
import { Toolbar } from '@artibox/slate-toolbar';
import { createHeading } from '@artibox/slate-heading';

const Heading = createHeading();

const plugins = [
  Heading.forPlugin({ disabled: [4, 5, 6] }),
  Toolbar.forPlugin({
    collapsedTools: [
      { icon: Heading1, hook: Heading.forToolHook({ level: 1 }) },
      { icon: Heading2, hook: Heading.forToolHook({ level: 2 }) },
      { icon: Heading3, hook: Heading.forToolHook({ level: 3 }) }
    ]
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
import { createHeadingJsxSerializerRule } from '@artibox/slate-heading';

const jsxSerializer = createJsxSerializer({
  blocks: [
    createHeadingJsxSerializerRule()
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
- [createHeading](./src/heading.ts#L34)
- [createHeadingJsxSerializerRule](./src/jsx-serializer.ts)
- [Heading.forPlugin](./src/heading.ts#L40)
- [Heading.forToolHook](./src/heading.ts#L50)
- [HeadingController](./src/controller.ts#L8)

### Utils

- [createHeadingBlock](./src/utils/create-heading-block.ts)
- [getHeadingLevelFromBlock](./src/utils/get-heading-level-from-block.ts)
- [getHeadingPropsFromBlock](./src/utils/get-heading-props-from-block.ts)

### Components

- [Heading](./src/components/heading.tsx)

## Hotkey

| OS                       | Shortcut                                          |
| ------------------------ | ------------------------------------------------- |
| ![Apple Logo][apple]     | <kbd>ctrl</kbd>+<kbd>opt</kbd>+<kbd>`level`</kbd> |
| ![Windows Logo][windows] | <kbd>ctrl</kbd>+<kbd>alt</kbd>+<kbd>`level`</kbd> |

[apple]: https://cdn2.iconfinder.com/data/icons/designer-skills/128/apple-ios-system-platform-os-mac-linux-48.png
[windows]: https://cdn2.iconfinder.com/data/icons/designer-skills/128/windows-48.png
