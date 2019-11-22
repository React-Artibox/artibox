import React from 'react';
import { RenderBlockProps, RenderAttributes } from 'slate-react';
import { PickPluginAndRequired } from '../types/plugin.types';
import { CommonRendererConfig, NodeIsVoid } from './renderer.interfaces';

export type CommonBlockRendererConfig<P extends RenderAttributes = RenderAttributes> = CommonRendererConfig<
  RenderBlockProps,
  P
> &
  NodeIsVoid;

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
