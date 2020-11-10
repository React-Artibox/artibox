import { BLOCKQUOTE_TYPE } from '@artibox/slate-common/blockquote/common';
import { createJsxSerializeElement, CreateJsxSerializeElementOptions } from '../../jsx-serializer';
import { defaultRenderBlockquoteElement } from '../defaultRenderBlockquoteElement';
import { JsxSerializeBlockquoteElementProps } from './typings';

export type CreateJsxSerializeBlockquoteOptions = Partial<
  CreateJsxSerializeElementOptions<JsxSerializeBlockquoteElementProps>
>;

export function createJsxSerializeBlockquote(options: CreateJsxSerializeBlockquoteOptions = {}) {
  const { type = BLOCKQUOTE_TYPE, render = defaultRenderBlockquoteElement } = options;
  return createJsxSerializeElement<JsxSerializeBlockquoteElementProps>({ type, render });
}
