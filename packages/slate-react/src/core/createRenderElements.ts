import { createRenderElementsBase } from '../_internal/renderer/createRenderElementsBase';
import { CreateRenderElementOptions, RenderElementProps } from './typings/renderer';

export function createRenderElements<P extends RenderElementProps>(options: CreateRenderElementOptions<P>[]) {
  return createRenderElementsBase<P, RenderElementProps>(options);
}
