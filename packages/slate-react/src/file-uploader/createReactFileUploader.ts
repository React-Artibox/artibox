import { createFileUploader } from '@artibox/slate-common/file-uploader';
import { createRenderElement } from '../core';
import { ReactFileUploader } from './typings';
import { defaultRenderFileUploaderElement } from './defaultRenderFileUploaderElement';

export interface CreateReactFileUploaderOptions {
  type?: string;
}

export function createReactFileUploader(options: CreateReactFileUploaderOptions = {}): ReactFileUploader {
  const core = createFileUploader(options);
  const { type } = core;

  return {
    ...core,
    createRenderElement: ({ render = defaultRenderFileUploaderElement } = {}) =>
      createRenderElement({
        type,
        render
      })
  };
}
