import React from 'react';
import { RenderBlockProps, RenderAttributes } from 'slate-react';
import { PickPluginAndRequired } from '../types/plugin.types';
import { RendererBaseComponent } from './renderer.types';

export interface CommonBlockRendererConfig<P extends RenderAttributes = RenderAttributes> {
  type: string;
  component: RendererBaseComponent<P>;
  getProps?: (props: RenderBlockProps) => object;
  isVoid?: boolean;
}

export type CommonBlockRenderer = PickPluginAndRequired<'renderBlock'>;

export function CommonBlockRenderer<P extends RenderAttributes = RenderAttributes>(
  config: CommonBlockRendererConfig<P>
): CommonBlockRenderer {
  const { type, component, getProps, isVoid = false } = config;
  const Component = component as any;

  return {
    renderBlock(props, _, next) {
      if (props.node.type !== type) {
        return next();
      }

      const { children, attributes } = props;
      const data = getProps?.(props);

      return (
        <Component {...attributes} {...data}>
          {isVoid ? undefined : children}
        </Component>
      );
    }
  };
}
