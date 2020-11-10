import { READ_MORE_TYPE } from '@artibox/slate-common/read-more/common';
import { createJsxSerializeElement, CreateJsxSerializeElementOptions } from '../../jsx-serializer';
import { JsxSerializeReadMoreProps } from './typings';
import { defaultRenderReadMoreElement } from '../defaultRenderReadMoreElement';

export type CreateJsxSerializeReadMoreOptions = Partial<CreateJsxSerializeElementOptions<JsxSerializeReadMoreProps>>;

export function createJsxSerializeReadMore(options: CreateJsxSerializeReadMoreOptions = {}) {
  const { type = READ_MORE_TYPE, render = defaultRenderReadMoreElement } = options;
  return createJsxSerializeElement({ type, render });
}
