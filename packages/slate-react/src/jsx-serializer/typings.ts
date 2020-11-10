import { Element } from 'slate';
import { WithElementParent } from '@artibox/slate-common/serializers/typings';
import {
  CreateRenderElementOptionsBase,
  CreateRenderMarkOptionsBase,
  RenderElementPropsBase,
  RenderLeafPropsBase,
  RenderMarkPropsBase
} from '../_internal/renderer/typings';

export type JsxSerializeLeafProps = RenderLeafPropsBase;

export type JsxSerializeMarkProps<M> = RenderMarkPropsBase<M>;

export type JsxSerializeElementProps<E extends Element = Element> = RenderElementPropsBase<E & WithElementParent>;

export type CreateJsxSerializeMarkOptions<M> = CreateRenderMarkOptionsBase<M, JsxSerializeMarkProps<M>>;

export type CreateJsxSerializeElementOptions<P extends JsxSerializeElementProps> = CreateRenderElementOptionsBase<P>;
