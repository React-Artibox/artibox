import { createRenderElementsBase } from '../_internal/renderer/createRenderElementsBase';
import { CreateJsxSerializeElementOptions, JsxSerializeElementProps } from './typings';

export function createJsxSerializeElements<P extends JsxSerializeElementProps>(
  options: CreateJsxSerializeElementOptions<P>[]
) {
  return createRenderElementsBase<P, JsxSerializeElementProps>(options);
}
