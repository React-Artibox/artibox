<div align="center">
  <img
    src="https://raw.githubusercontent.com/ianstormtaylor/slate/master/docs/images/banner.png"
    height="200"
  />
</div>

<h1 align="center">@artibox/slate-input-block</h1>

<div align="center">

[Slate](https://github.com/ianstormtaylor/slate) input-block.

[![npm package](https://img.shields.io/npm/v/@artibox/slate-input-block.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-input-block)
[![npm downloads](https://img.shields.io/npm/dt/@artibox/slate-input-block.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-input-block)

</div>

## Introduction

This package is an util related to input process of editor.  
You can use this package to let user input some string and then do something on the string while confirmed.  
Like link, image, youtube, ...etc.

## Installation

```bash
npm install @artibox/slate-input-block --save

or

$ yarn add @artibox/slate-input-block
```

## Usage

```js
import React from 'react';
import { Facebook as FacebookIcon } from '@artibox/icons';
import { createArtiboxEditor } from '@artibox/slate-editor';
import { Toolbar } from '@artibox/slate-toolbar';
import { createFacebook } from '@artibox/slate-facebook';
import { createInputBlock } from '@artibox/slate-input-block';

const Facebook = createFacebook();
const InputBlock = createInputBlock();

const plugins = [
  Facebook.forPlugin(),
  InputBlock.forPlugin(),
  Toolbar.forPlugin({
    collapsedTools: [{ icon: FacebookIcon, hook: Facebook.forToolHook({ setInputConfig: InputBlock.start }) }]
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
- [createInputBlock](./src/input-block.ts#L12)
- [InputBlock.forPlugin](./src/facebook.ts#L18)
- [InputBlockController](./src/controller.ts#L4)
