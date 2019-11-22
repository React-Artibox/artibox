import { RenderAttributes, RenderNodeProps, RenderProps } from 'slate-react';
import { HasNodeType } from '../interfaces/common.interfaces';
import { RendererBaseComponent } from './renderer.types';

export interface CommonRendererConfig<RP, P extends RenderAttributes = RenderAttributes> extends HasNodeType {
  getProps?: (props: RP extends RenderNodeProps | RenderProps ? RP : never) => object;
  component: RendererBaseComponent<P>;
}

export interface NodeIsVoid {
  isVoid?: boolean;
}
