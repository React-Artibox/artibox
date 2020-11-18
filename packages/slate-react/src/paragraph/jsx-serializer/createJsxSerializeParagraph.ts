import { PARAGRAPH_TYPE } from '@artibox/slate-common/paragraph/common';
import { createJsxSerializeElement, CreateJsxSerializeElementOptions } from '../../jsx-serializer';
import { defaultRenderParagraphElement } from '../defaultRenderParagraphElement';
import { JsxSerializeParagraphProps } from './typings';

export type CreateJsxSerializeParagraphOptions = Partial<
  Omit<CreateJsxSerializeElementOptions<JsxSerializeParagraphProps>, 'type'>
>;

export function createJsxSerializeParagraph(options: CreateJsxSerializeParagraphOptions = {}) {
  const { render = defaultRenderParagraphElement } = options;
  return createJsxSerializeElement<JsxSerializeParagraphProps>({ type: PARAGRAPH_TYPE, render });
}
