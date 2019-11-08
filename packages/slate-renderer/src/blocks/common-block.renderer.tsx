import React, { ReactHTML, ComponentType } from 'react';
import { RenderAttributes } from 'slate-react';
import { PickPluginAndRequired } from '@artibox/slate-core';

export interface CommonBlockRendererConfig {
  type: string;
  component: keyof ReactHTML | ComponentType<RenderAttributes>;
  isVoid?: boolean;
}

export type CommonBlockRenderer = PickPluginAndRequired<'renderBlock'>;

export function CommonBlockRenderer(config: CommonBlockRendererConfig): CommonBlockRenderer {
  const { type, component: Component, isVoid = false } = config;

  return {
    renderBlock(props, _, next) {
      const { children, attributes } = props;

      if (type !== props.node.type) {
        return next();
      }

      //  eslint-disable-next-line react/no-children-prop
      return <Component {...attributes} children={isVoid ? undefined : children} />;
    }
  };
}
