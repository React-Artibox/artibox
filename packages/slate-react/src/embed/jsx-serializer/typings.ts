import { EmbedElement } from '@artibox/slate-common/embed/common';
import { JsxSerializeElementProps } from '../../jsx-serializer';

export interface JsxSerializeEmbedElementProps<ED extends Record<string, unknown>, D>
  extends JsxSerializeElementProps<EmbedElement & ED> {
  data: D;
}

export type JsxSerializeEmbedElement<ED extends Record<string, unknown>, D> = (
  props: JsxSerializeEmbedElementProps<ED, D>
) => JSX.Element | null | undefined;
