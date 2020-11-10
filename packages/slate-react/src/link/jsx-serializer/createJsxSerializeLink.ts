import { LINK_TYPE } from '@artibox/slate-common/link/common';
import { createJsxSerializeElement, CreateJsxSerializeElementOptions } from '../../jsx-serializer';
import { JsxSerializeLinkElementProps } from './typings';
import { defaultRenderLinkElement } from './defaultRenderLinkElement';

export type CreateJsxSerializeLinkOptions = Partial<CreateJsxSerializeElementOptions<JsxSerializeLinkElementProps>>;

export function createJsxSerializeLink(options: CreateJsxSerializeLinkOptions = {}) {
  const { type = LINK_TYPE, render = defaultRenderLinkElement } = options;
  return createJsxSerializeElement({ type, render });
}
