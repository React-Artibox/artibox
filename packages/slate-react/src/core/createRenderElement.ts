import { createRenderElementBase } from '../_internal/renderer/createRenderElementBase';
import { CreateRenderElementOptions, RenderElementProps } from './typings/renderer';

export function createRenderElement<P extends RenderElementProps>(options: CreateRenderElementOptions<P>) {
  return createRenderElementBase<P, RenderElementProps>(options);
}
