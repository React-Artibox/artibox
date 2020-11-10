import { createRenderMarkBase } from '../_internal/renderer/createRenderMarkBase';
import { CreateJsxSerializeMarkOptions } from './typings';

export function createJsxSerializeMark<M>(options: CreateJsxSerializeMarkOptions<M>) {
  return createRenderMarkBase(options);
}
