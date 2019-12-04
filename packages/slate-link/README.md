<div align="center">
  <img
    src="https://raw.githubusercontent.com/ianstormtaylor/slate/master/docs/images/banner.png"
    height="200"
  />
</div>

<h1 align="center">@artibox/slate-link</h1>

<div align="center">

[Slate](https://github.com/ianstormtaylor/slate) link.

[![npm package](https://img.shields.io/npm/v/@artibox/slate-link.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-link)
[![npm downloads](https://img.shields.io/npm/dt/@artibox/slate-link.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-link)

</div>

## Installation

```bash
npm install @artibox/slate-link --save

or

$ yarn add @artibox/slate-link
```

## Usage

### Editor

```js
import React from 'react';
import { Link as LinkIcon } from '@artibox/icons';
import { createArtiboxEditor } from '@artibox/slate-editor';
import { Toolbar } from '@artibox/slate-toolbar';
import { createLink } from '@artibox/slate-link';

const Link = createLink();

const plugins = [
  Link.forPlugin(),
  Toolbar.forPlugin({
    expandedTools: [
      { icon: Link, hook: link.forToolHook() },
      { icon: Unlink, hook: link.forToolHook({ command: 'remove' }) }
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
import { createLinkJsxSerializerRule } from '@artibox/slate-link';

const jsxSerializer = createJsxSerializer({
  inlines: [
    createLinkJsxSerializerRule()
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
- [createLink](./src/link.ts#L20)
- [createLinkJsxSerializerRule](./src/jsx-serializer.ts)
- [Link.forPlugin](./src/link.ts#L26)
- [Link.forToolHook](./src/link.ts#L33)
- [LinkController](./src/controller.ts#L6)

### Utils

- [getLinkPropsFromInline](./src/utils/get-link-props-from-inline.ts)
- [getLinkUrlFromInline](./src/utils/get-link-url-from-inline.ts)
- [createLinkInline](./src/utils/create-link-inline.ts)
- [isUrl](./src/utils/is-url.ts)

### Components

- [Link](./src/components/link.tsx) - Default component only for renderer of editor since it provide tooltip.
- [LinkModal](./src/components/link-modal/link-modal.tsx) - Currently archived, please don't use it.
