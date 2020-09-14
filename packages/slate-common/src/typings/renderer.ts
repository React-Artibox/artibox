import { ReactHTML, ForwardRefExoticComponent } from 'react';
import { RenderAttributes, RenderNodeProps, RenderProps, Editor } from 'slate-react';
import { NodeType } from './common';

export type RendererBaseComponent<P = Record<string, unknown>> = keyof ReactHTML | ForwardRefExoticComponent<P>;

/**
 * Type of component that can be rendered by `slate-react`.
 *
 * @typeparam P - Props of component.
 */
export type RendererBaseComponentWithAttributes<P = Record<string, unknown>> = RendererBaseComponent<
  P & RenderAttributes
>;

/**
 * The configuration of common renderer of `slate-react`.
 *
 * @typeparam RP - Props provided by `slate-react` which extends [[RenderNodeProps | RenderProps]].
 * @property getProps - Get the props of component from `RP`.
 */
export interface CreateCommonRendererConfig<RP, P extends RenderAttributes = RenderAttributes> extends NodeType {
  component: RendererBaseComponentWithAttributes<P>;
  getProps?: (props: RP extends RenderNodeProps | RenderProps ? RP : never, editor: Editor) => Partial<P>;
}

export interface NodeIsVoid {
  isVoid?: boolean;
}
