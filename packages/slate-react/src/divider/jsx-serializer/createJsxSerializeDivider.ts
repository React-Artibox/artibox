import { DIVIDER_TYPE } from '@artibox/slate-common/divider/common';
import { createJsxSerializeElement, CreateJsxSerializeElementOptions } from '../../jsx-serializer';
import { JsxSerializeDividerProps } from './typings';
import { defaultRenderDividerElement } from './defaultRenderDividerElement';

export type CreateJsxSerializeDividerOptions = Partial<CreateJsxSerializeElementOptions<JsxSerializeDividerProps>>;

export function createJsxSerializeDivider(options: CreateJsxSerializeDividerOptions = {}) {
  const { type = DIVIDER_TYPE, render = defaultRenderDividerElement } = options;
  return createJsxSerializeElement({ type, render });
}
