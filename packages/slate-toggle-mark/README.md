<div align="center">
  <img
    src="https://raw.githubusercontent.com/ianstormtaylor/slate/master/docs/images/banner.png"
    height="200"
  />
</div>

<h1 align="center">@artibox/slate-toggle-mark</h1>

<div align="center">

[Slate](https://github.com/ianstormtaylor/slate) toggle-mark.

[![npm package](https://img.shields.io/npm/v/@artibox/slate-toggle-mark.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-toggle-mark)
[![npm downloads](https://img.shields.io/npm/dt/@artibox/slate-toggle-mark.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-toggle-mark)

</div>

## Introduction

This package is not for installing directly.  
Toggle mark means a mark which is toggleable and without any data, like bold, italic, underline, ...etc.

## Usage

### Editor

```ts
import React from 'react';
import { Bold as BoldIcon } from '@artibox/icons';
import { createArtiboxEditor } from '@artibox/slate-editor';
import { Toolbar } from '@artibox/slate-toolbar';
import { createToggleMarkCreator } from '@artibox/slate-toggle-mark';

const createBold = createToggleMarkCreator({
  type: 'bold',
  component: 'strong',
  hotkey: 'mod+b'
});
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

```ts
import { createJsxSerializer } from '@artibox/slate-jsx-serializer';
import { createToggleMarkJsxSerializerRuleCreator } from '@artibox/slate-toggle-mark';

const value = ...;  //  from editor

const createBoldJsxSerializerRule = createToggleMarkJsxSerializerRuleCreator({
  type: 'bold',
  component: 'strong'
});

const jsxSerializer = createJsxSerializer({
  marks: [
    createBoldJsxSerializerRule()
  ]
});
```

## API

- [createToggleMarkCreator](./src/toggle-mark.ts#L20)
- [createToggleMarkJsxSerializerRuleCreator](./src/jsx-serializer.ts)
- [ToggleMark.forPlugin](./src/toggle-mark.ts#L27)
- [ToggleMark.forToolHook](./src/toggle-mark.ts#L34)
- [ToggleMarkController](./src/controller.ts#L4)
