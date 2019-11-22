import React from 'react';
import { RenderInlineProps, RenderAttributes } from 'slate-react';
import { PickPluginAndRequired } from '../types/plugin.types';
import { CommonRendererConfig, NodeIsVoid } from './renderer.interfaces';

export type CommonInlineRendererConfig<P extends RenderAttributes = RenderAttributes> = CommonRendererConfig<
  RenderInlineProps,
  P
> &
  NodeIsVoid;

export type CommonInlineRenderer = PickPluginAndRequired<'renderInline'>;

export function CommonInlineRenderer<P extends RenderAttributes = RenderAttributes>(
  config: CommonInlineRendererConfig<P>
): CommonInlineRenderer {
  const { type, component, getProps, isVoid = false } = config;
  const Component = component as any;

  return {
    renderInline(props, _, next) {
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
