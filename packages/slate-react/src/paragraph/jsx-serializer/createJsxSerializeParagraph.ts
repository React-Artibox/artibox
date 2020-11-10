import { PARAGRAPH_TYPE } from '@artibox/slate-common/paragraph/common';
import { createJsxSerializeElement, CreateJsxSerializeElementOptions } from '../../jsx-serializer';
import { defaultRenderParagraphElement } from '../defaultRenderParagraphElement';
import { JsxSerializeParagraphProps } from './typings';

export type CreateJsxSerializeParagraphOptions = Partial<CreateJsxSerializeElementOptions<JsxSerializeParagraphProps>>;

export function createJsxSerializeParagraph(options: CreateJsxSerializeParagraphOptions = {}) {
  const { type = PARAGRAPH_TYPE, render = defaultRenderParagraphElement } = options;
  return createJsxSerializeElement<JsxSerializeParagraphProps>({ type, render });
}
