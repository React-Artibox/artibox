import { createRenderMarkBase } from '../_internal/renderer/createRenderMarkBase';
import { CreateRenderMarkOptions } from './typings/renderer';

export function createRenderMark<M>(options: CreateRenderMarkOptions<M>) {
  return createRenderMarkBase(options);
}
