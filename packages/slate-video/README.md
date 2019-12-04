<div align="center">
  <img
    src="https://raw.githubusercontent.com/ianstormtaylor/slate/master/docs/images/banner.png"
    height="200"
  />
</div>

<h1 align="center">@artibox/slate-video</h1>

<div align="center">

[Slate](https://github.com/ianstormtaylor/slate) video.

[![npm package](https://img.shields.io/npm/v/@artibox/slate-video.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-video)
[![npm downloads](https://img.shields.io/npm/dt/@artibox/slate-video.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-video)

</div>

## Installation

```bash
npm install @artibox/slate-video --save

or

$ yarn add @artibox/slate-video
```

## Usage

### Editor

```js
import React from 'react';
import { Video as VideoIcon } from '@artibox/icons';
import { createArtiboxEditor } from '@artibox/slate-editor';
import { Toolbar } from '@artibox/slate-toolbar';
import { createVideo } from '@artibox/slate-video';

const Video = createVideo();

const plugins = [
  Video.forPlugin(),
  Toolbar.forPlugin({
    collapsedTools: [{ icon: VideoIcon, hook: Video.forToolHook() }]
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
import { createVideoJsxSerializerRule } from '@artibox/slate-video';

const value = ...;  //  from editor

const jsxSerializer = createJsxSerializer({
  blocks: [
    createVideoJsxSerializerRule()
  ]
});
```

## API

- [constants](./src/constants.ts)
- [typings](./src/typings.ts)
- [createVideo](./src/video.ts#L23)
- [createVideoJsxSerializerRule](./src/jsx-serializer.ts)
- [Video.forPlugin](./src/video.ts#L29)
- [Video.forToolHook](./src/video.ts#L36)
- [VideoController](./src/controller.ts#L7)

### Utils

- [getVideoPropsFromBlock](./src/utils/get-video-props-from-block.ts)
- [createVideoBlock](./src/utils/create-video-block.ts)

### Components

- [Video](./src/components/video.tsx)
