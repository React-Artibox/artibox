<h1 align="center">@artibox/icons</h1>

<div align="center">

[![npm package](https://img.shields.io/npm/v/@artibox/icons.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/icons)
[![npm downloads](https://img.shields.io/npm/dt/@artibox/icons.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/icons)

</div>

## Installation

```bash
npm install @artibox/icons --save

or

$ yarn add @artibox/icons
```

## Introduction

This package just only includes `all icons for artibox` and the interface `IconDefinition`.

## Usage

### Definition

Please see the [definition](./src/typings.ts) first.  
All icons are restricted in this definition.

### Import

```ts
//  import from root.
import { AlignLeft } from '@artibox/icons';
//  or for single import
import { AlignLeft } from '@artibox/icons/align-left';
```

### Render

You can use the icon definition to render the svg by yourself.eg.

```tsx
...

return (
  <svg>
    <path {...icon.definition.path} />
  </svg>
);
```

Or use the [Icon](../components/src/Icon/index.tsx) component of artibox.
