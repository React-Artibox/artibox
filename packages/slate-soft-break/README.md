<div align="center">
  <img
    src="https://raw.githubusercontent.com/ianstormtaylor/slate/master/docs/images/banner.png"
    height="200"
  />
</div>

<h1 align="center">@artibox/slate-soft-break</h1>

<div align="center">

[Slate](https://github.com/ianstormtaylor/slate) sort break.

[![npm package](https://img.shields.io/npm/v/@artibox/slate-soft-break.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-soft-break)
[![npm downloads](https://img.shields.io/npm/dt/@artibox/slate-soft-break.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-soft-break)

</div>

## Installation

```bash
npm install @artibox/slate-soft-break --save

or

$ yarn add @artibox/slate-soft-break
```

## Usage

### Editor

```js
import React from 'react';
import { createArtiboxEditor } from '@artibox/slate-editor';
import { SoftBreak } from '@artibox/slate-soft-break';

const plugins = [SoftBreak.forPlugin()];

const Editor = createArtiboxEditor({
  plugins
});

export default Editor;
```

## API

- [insertSoftBreak](./src/add-soft-break.ts)
- [SoftBreak.forPlugin](./src/soft-break.ts#L13)
