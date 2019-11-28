import { ReactHTML, ComponentType } from 'react';
import { RenderAttributes, RenderNodeProps, RenderProps } from 'slate-react';
import { NodeType } from './common';

export type RendererBaseComponent<P extends RenderAttributes = RenderAttributes> = keyof ReactHTML | ComponentType<P>;

export interface CreateCommonRendererConfig<RP, P extends RenderAttributes = RenderAttributes> extends NodeType {
  component: RendererBaseComponent<P>;
  getProps?: (props: RP extends RenderNodeProps | RenderProps ? RP : never) => Partial<P>;
}

export interface NodeIsVoid {
  isVoid?: boolean;
}
