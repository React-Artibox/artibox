<div align="center">
  <img
    src="https://raw.githubusercontent.com/ianstormtaylor/slate/master/docs/images/banner.png"
    height="200"
  />
</div>

<h1 align="center">@artibox/slate-editor</h1>

<div align="center">

[Slate](https://github.com/ianstormtaylor/slate) editor.

[![npm package](https://img.shields.io/npm/v/@artibox/slate-editor.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-editor)
[![npm downloads](https://img.shields.io/npm/dt/@artibox/slate-editor.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-editor)

</div>

## Installation

```bash
npm install @artibox/slate-editor --save

or

$ yarn add @artibox/slate-editor
```

## Usage

```js
import React from 'react';
import { createArtiboxEditor } from '@artibox/slate-editor';

const initialValue = ...;// from slate

const plugins = [
  // ...
];

const ArtiboxEditor = createArtiboxEditor({
  plugins
});

const YourEditor = () => {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback(change => setValue(change.value), []);

  return (
    <ArtiboxEditor
      value={value}
      onChange={onChange}
    />
  );
}
```

## API

- [createArtiboxEditor](./src/editor.tsx#L22)
