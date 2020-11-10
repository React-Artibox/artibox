import { HEADING_TYPE } from '@artibox/slate-common/heading/common';
import { createJsxSerializeElement, CreateJsxSerializeElementOptions } from '../../jsx-serializer';
import { defaultRenderHeadingElement } from '../defaultRenderHeadingElement';
import { JsxSerializeHeadingElementProps } from './typings';

export type CreateJsxSerializeHeadingOptions = Partial<
  CreateJsxSerializeElementOptions<JsxSerializeHeadingElementProps>
>;

export function createJsxSerializeHeading(options: CreateJsxSerializeHeadingOptions = {}) {
  const { type = HEADING_TYPE, render = defaultRenderHeadingElement } = options;
  return createJsxSerializeElement<JsxSerializeHeadingElementProps>({ type, render });
}
