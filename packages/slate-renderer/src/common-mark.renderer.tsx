import React from 'react';
import { RenderMarkProps } from 'slate-react';
import { PickPluginAndRequired } from '@artibox/slate-core';
import { RendererBaseComponent } from './types';

export interface CommonMarkRendererConfig {
  type: string;
  component: RendererBaseComponent;
  getProps?: (props: RenderMarkProps) => object;
}

export type CommonMarkRenderer = PickPluginAndRequired<'renderMark'>;

export function CommonMarkRenderer(config: CommonMarkRendererConfig): CommonMarkRenderer {
  const { type, component: Component, getProps } = config;

  return {
    renderMark(props, _, next) {
      if (props.mark.type !== type) {
        return next();
      }

      const { children, attributes } = props;
      const data = getProps?.(props);

      return (
        <Component {...attributes} {...data}>
          {children}
        </Component>
      );
    }
  };
}
