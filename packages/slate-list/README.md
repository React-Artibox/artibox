<div align="center">
  <img
    src="https://raw.githubusercontent.com/ianstormtaylor/slate/master/docs/images/banner.png"
    height="200"
  />
</div>

<h1 align="center">@artibox/slate-list</h1>

<div align="center">

[Slate](https://github.com/ianstormtaylor/slate) list.

[![npm package](https://img.shields.io/npm/v/@artibox/slate-list.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-list)
[![npm downloads](https://img.shields.io/npm/dt/@artibox/slate-list.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-list)

</div>

## Installation

```bash
npm install @artibox/slate-list --save

or

$ yarn add @artibox/slate-list
```

## Usage

### Editor

```js
import React from 'react';
import { UnorderedList, OrderedList } from '@artibox/icons';
import { createArtiboxEditor } from '@artibox/slate-editor';
import { Toolbar } from '@artibox/slate-toolbar';
import { createList } from '@artibox/slate-list';

const List = createList();

const plugins = [
  ...List.forPlugin(),
  Toolbar.forPlugin({
    collapsedTools: [
      { icon: UnorderedList, hook: List.forToolHook({ orderedType: 'unordered' }) },
      { icon: OrderedList, hook: List.forToolHook({ orderedType: 'ordered' }) }
    ]
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
import { createListJsxSerializerRules } from '@artibox/slate-list';

const value = ...;  //  from editor

const jsxSerializer = createJsxSerializer({
  marks: [
    ...createListJsxSerializerRules()
  ]
});
```

## API

- [constants](./src/constants.ts)
- [typings](./src/typings.ts)
- [createList](./src/list.ts#L27)
- [createListJsxSerializerRules](./src/jsx-serializer.ts)
- [List.forPlugin](./src/list.ts#L34)
- [List.forToolHook](./src/list.ts#L41)
- [ListController](./src/controller.ts#L5)

## Hotkey

| OS                                            | Feature             | Shortcut                        |
| --------------------------------------------- | ------------------- | ------------------------------- |
| ![Apple Logo][apple] ![Windows Logo][windows] | Increase item depth | <kbd>tab</kbd>                  |
| ![Apple Logo][apple] ![Windows Logo][windows] | Decrease item depth | <kbd>shift</kbd>+<kbd>tab</kbd> |

[apple]: https://cdn2.iconfinder.com/data/icons/designer-skills/128/apple-ios-system-platform-os-mac-linux-48.png
[windows]: https://cdn2.iconfinder.com/data/icons/designer-skills/128/windows-48.png
