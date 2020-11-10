import { createReadMore, CreateReadMoreOptions } from '@artibox/slate-common/read-more';
import { createRenderElement } from '../core';
import { defaultRenderReadMoreElement } from './defaultRenderReadMoreElement';
import { ReactReadMore } from './typings';

export type CreateReactReadMoreOptions = CreateReadMoreOptions;

export function createReactReadMore(options: CreateReactReadMoreOptions = {}): ReactReadMore {
  const core = createReadMore(options);
  const { type } = core;

  return {
    ...core,
    createRenderElement: ({ render = defaultRenderReadMoreElement } = {}) => createRenderElement({ type, render })
  };
}
