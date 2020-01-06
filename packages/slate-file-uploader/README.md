<div align="center">
  <img
    src="https://raw.githubusercontent.com/ianstormtaylor/slate/master/docs/images/banner.png"
    height="200"
  />
</div>

<h1 align="center">@artibox/slate-file-uploader</h1>

<div align="center">

[Slate](https://github.com/ianstormtaylor/slate) file-uploader.

[![npm package](https://img.shields.io/npm/v/@artibox/slate-file-uploader.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-file-uploader)
[![npm downloads](https://img.shields.io/npm/dt/@artibox/slate-file-uploader.svg?maxAge=60)](https://www.npmjs.com/package/@artibox/slate-file-uploader)

</div>

## Introduction

This package is an util related to process of file uploading of editor.  
You can use this package to upload files to some third party storages.
Like gcloud storage, s3, ...etc.

## Installation

```bash
npm install @artibox/slate-file-uploader --save

or

$ yarn add @artibox/slate-file-uploader
```

## Usage

```js
import React from 'react';
import { Image as ImageIcon } from '@artibox/icons';
import { createArtiboxEditor } from '@artibox/slate-editor';
import { createImage } from '@artibox/slate-image';
import { createFileUploader } from '@artibox/slate-file-uploader';
import { Toolbar } from '@artibox/slate-toolbar';

const Image = createImage({
  hostingResolvers: {
    GCLOUD_STORAGE: name => `<Your Public Url>/${name}`
  }
});
const FileUploader = createFileUploader({
  accept: ['image/*'],
  createNode: {
    image: {
      dataURL: dataURL => Image.createBlock(dataURL, 'GCLOUD_STORAGE'),
      response: response => Image.createBlock(JSON.parse(response).name, 'GCLOUD_STORAGE')
    }
  },
  headers: file => ({
    Authorization: 'Bearer <Your OAuth2 Token>',
    'Content-Type': file.type
  }),
  url: file =>
    `https://storage.googleapis.com/upload/storage/v1/b/<Your Bucket Name>/o?uploadType=media&name=${file.name}`
});

const plugins = [
  Image.forPlugin(),
  FileUploader.forPlugin(),
  Toolbar.forPlugin({
    collapsedTools: [{ icon: ImageIcon, hook: FileUploader.forToolHook() }]
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
- [createFileUploader](./src/file-uploader.ts#L33)
- [FileUploader.forPlugin](./src/file-uploader.ts#L87)
- [FileUploader.forToolHook](./src/file-uploader.ts#L94)
- [FileUploaderController](./src/controller.ts#L4)
