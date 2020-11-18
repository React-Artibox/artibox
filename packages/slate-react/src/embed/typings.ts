import { Embed, EmbedElement } from '@artibox/slate-common/embed';
import { WithCreateRenderElement, RenderElementProps } from '../core';
import { WithEmbedRenderData } from './_internal/renderer/typings';

export interface RenderEmbedElementProps<EmbedData extends Record<string, unknown>, RenderData>
  extends RenderElementProps<EmbedElement & EmbedData>,
    WithEmbedRenderData<RenderData> {}

export type ReactEmbedCreateRenderElementOptions<Provider extends string> = Record<
  Provider,
  (props: RenderEmbedElementProps<any, any>) => JSX.Element | null | undefined
>;

export interface ReactEmbed<Provider extends string>
  extends Embed<Provider>,
    WithCreateRenderElement<[ReactEmbedCreateRenderElementOptions<Provider>]> {}
