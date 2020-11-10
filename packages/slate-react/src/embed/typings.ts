import { Embed, EmbedElement } from '@artibox/slate-common/embed';
import { WithCreateRenderElement, RenderElementProps } from '../core';

export interface RenderEmbedElementProps<ED extends Record<string, unknown>, D>
  extends RenderElementProps<EmbedElement & ED> {
  data: D;
}

export type RenderEmbedElement<ED extends Record<string, unknown>, D> = (
  props: RenderEmbedElementProps<ED, D>
) => JSX.Element | null | undefined;

export type ReactEmbedForRenderElememntOptions<P extends string> = Record<P, RenderEmbedElement<any, any>>;

export type ReactEmbed<P extends string> = Embed<P> & WithCreateRenderElement<[ReactEmbedForRenderElememntOptions<P>]>;
