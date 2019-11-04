import React, { ReactHTML, ComponentType } from 'react';
import { RenderAttributes, Plugin } from 'slate-react';
import { Required } from 'utility-types';

export interface CommonBlockRendererConfig {
  type: string;
  component: keyof ReactHTML | ComponentType<RenderAttributes>;
  isVoid?: boolean;
}

export type CommonBlockRenderer = Required<Plugin, 'renderBlock'>;

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
