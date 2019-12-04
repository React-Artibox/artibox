<div align="center">
  <img
    src="https://raw.githubusercontent.com/ianstormtaylor/slate/master/docs/images/banner.png"
    height="200"
  />
</div>

<h1 align="center">@artibox/slate-toolbar</h1>

<div align="center">

[Slate](https://github.com/ianstormtaylor/slate) toolbar.

[![npm package](https://img.shields.io/npm/v/@artibox/slate-toolbar.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-toolbar)
[![npm downloads](https://img.shields.io/npm/dt/@artibox/slate-toolbar.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-toolbar)

</div>

## Introduction

Quick and easy way to implement medium like toolbar in your slate editor.

## Installation

```bash
npm install @artibox/slate-toolbar --save

or

$ yarn add @artibox/slate-toolbar
```

## Usage

```js
import React from 'react';
import { Toolbar as ToolbarIcon } from '@artibox/icons';
import { createArtiboxEditor } from '@artibox/slate-editor';
import { Toolbar } from '@artibox/slate-toolbar';

const plugins = [
  Toolbar.forPlugin({
    disabledBlocks: [
      /* ... */
    ],
    expandedTools: [
      /* ... */
    ],
    collapsedTools: [
      /* ... */
    ]
  })
];

const Editor = createArtiboxEditor({
  plugins
});

export default Editor;
```

## API

- [constants](./src/constants.ts)
- [typings](./src/typings.ts)
- [Toolbar.forPlugin](./src/toolbar.tsx#L19)
