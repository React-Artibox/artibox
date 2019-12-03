<div align="center">
  <img
    src="https://raw.githubusercontent.com/ianstormtaylor/slate/master/docs/images/banner.png"
    height="200"
  />
</div>

<h1 align="center">@artibox/slate-common</h1>

<div align="center">

[Slate](https://github.com/ianstormtaylor/slate) common.

[![npm package](https://img.shields.io/npm/v/@artibox/slate-common.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-common)
[![npm downloads](https://img.shields.io/npm/dt/@artibox/slate-common.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-common)

</div>

## Installation

```bash
npm install @artibox/slate-common --save

or

$ yarn add @artibox/slate-common
```

## Constants

- [PARAGRAPH_TYPE](./src/constants/paragraph.ts)

## Typings

- [common](./src/typings/common.ts)
- [input](./src/typings/input.ts) - About input process like link, embed, image, ...etc.
- [renderer](./src/typings/renderer.ts)
- [tool](./src/typings/tool.ts)

## Utils

- [isNodeExcludeText](./src/utils/is-node-exclude-text.ts)

## Renderers

- [createCommonBlockRenderer](./src/renderers/common-block.tsx)
- [createCommonEditorRenderer](./src/renderers/common-editor.tsx)
- [createCommonInlineRenderer](./src/renderers/common-inline.tsx)
- [createCommonMarkRenderer](./src/renderers/common-mark.tsx)
- [createParagraphRenderer](./src/renderers/paragraph.tsx)
