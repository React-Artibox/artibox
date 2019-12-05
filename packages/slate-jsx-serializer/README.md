<div align="center">
  <img
    src="https://raw.githubusercontent.com/ianstormtaylor/slate/master/docs/images/banner.png"
    height="200"
  />
</div>

<h1 align="center">@artibox/slate-jsx-serializer</h1>

<div align="center">

[Slate](https://github.com/ianstormtaylor/slate) jsx serializer.

[![npm package](https://img.shields.io/npm/v/@artibox/slate-jsx-serializer.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-jsx-serializer)
[![npm downloads](https://img.shields.io/npm/dt/@artibox/slate-jsx-serializer.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-jsx-serializer)

</div>

## Installation

```bash
npm install @artibox/slate-jsx-serializer --save

or

$ yarn add @artibox/slate-jsx-serializer
```

## Introduction

Quick and easy way to reuse your custom component of editor to serialize value json from slate and render.

## Usage

```tsx
import { Block } from 'slate';
import { createJsxSerializer } from '@artibox/slate-jsx-serializer';

...

function createSomeJsxSerializerRule(config?: CreateSomeJsxSerializerRuleConfig) {
  const { type = SOME_TYPE, component = SomeComponent } = config || {};
  return createJsxSerializerRule<Block>({
    type,
    component,
    getProps: block => ({
      someData: block.data.someData,
      otherData: block.data.otherData
    })
  });
}

const jsxSerializer = createJsxSerializer({
  blocks: [
    createSomeJsxSerializerRule({
      type: 'overrided some type',
      component: OverridedSomeComponent //  Which may be also used in editor.
    })
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

- [typings](./src/typings.ts)
- [createJsxSerializerRule](./src/rule.tsx)
- [createJsxSerializer](./src/serializer.tsx#L45)
