import { Inline } from 'slate';
import React, { ReactHTML, ComponentType } from 'react';
import { RenderAttributes } from 'slate-react';
import { PickPluginAndRequired } from '@artibox/slate-core';

export interface CommonInlineRendererConfig {
  type: string;
  component: keyof ReactHTML | ComponentType<RenderAttributes>;
  dataResolver?: (node: Inline) => object;
  isVoid?: boolean;
}

export type CommonInlineRenderer = PickPluginAndRequired<'renderInline'>;

export function CommonInlineRenderer(config: CommonInlineRendererConfig): CommonInlineRenderer {
  const { type, component: Component, dataResolver, isVoid = false } = config;

  return {
    renderInline(props, _, next) {
      const { children, attributes } = props;

      if (type !== props.node.type) {
        return next();
      }

      const data = dataResolver?.(props.node);

      return (
        <Component {...attributes} {...data}>
          {isVoid ? undefined : children}
        </Component>
      );
    }
  };
}
