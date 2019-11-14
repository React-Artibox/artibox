import React from 'react';
import { RenderBlockProps } from 'slate-react';
import { PickPluginAndRequired } from '@artibox/slate-core';
import { RendererBaseComponent } from './types';

export interface CommonBlockRendererConfig {
  type: string;
  component: RendererBaseComponent;
  getProps?: (props: RenderBlockProps) => object;
  isVoid?: boolean;
}

export type CommonBlockRenderer = PickPluginAndRequired<'renderBlock'>;

export function CommonBlockRenderer(config: CommonBlockRendererConfig): CommonBlockRenderer {
  const { type, component: Component, getProps, isVoid = false } = config;

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
