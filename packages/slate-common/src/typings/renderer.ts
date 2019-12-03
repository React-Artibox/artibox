import { ReactHTML, ComponentType } from 'react';
import { RenderAttributes, RenderNodeProps, RenderProps } from 'slate-react';
import { NodeType } from './common';

/**
 * Type of component that can be rendered by `slate-react`.
 *
 * @typeparam P - Props of component.
 */
export type RendererBaseComponent<P extends RenderAttributes = RenderAttributes> = keyof ReactHTML | ComponentType<P>;

/**
 * The configuration of common renderer of `slate-react`.
 *
 * @typeparam RP - Props provided by `slate-react` which extends [[RenderNodeProps | RenderProps]].
 * @property getProps - Get the props of component from `RP`.
 */
export interface CreateCommonRendererConfig<RP, P extends RenderAttributes = RenderAttributes> extends NodeType {
  component: RendererBaseComponent<P>;
  getProps?: (props: RP extends RenderNodeProps | RenderProps ? RP : never) => Partial<P>;
}

export interface NodeIsVoid {
  isVoid?: boolean;
}
