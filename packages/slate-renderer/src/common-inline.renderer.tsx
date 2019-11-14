import React from 'react';
import { RenderInlineProps } from 'slate-react';
import { PickPluginAndRequired } from '@artibox/slate-core';
import { RendererBaseComponent } from './types';

export interface CommonInlineRendererConfig {
  type: string;
  component: RendererBaseComponent;
  getProps?: (props: RenderInlineProps) => object;
  isVoid?: boolean;
}

export type CommonInlineRenderer = PickPluginAndRequired<'renderInline'>;

export function CommonInlineRenderer(config: CommonInlineRendererConfig): CommonInlineRenderer {
  const { type, component: Component, getProps, isVoid = false } = config;

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
