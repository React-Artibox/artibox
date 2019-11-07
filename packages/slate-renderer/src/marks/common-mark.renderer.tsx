import React, { ReactHTML, ComponentType } from 'react';
import { RenderAttributes } from 'slate-react';
import { PickPluginAndRequired } from '@artibox/slate-core';

export interface CommonMarkRendererConfig {
  type: string;
  component: keyof ReactHTML | ComponentType<RenderAttributes>;
}

export type CommonMarkRenderer = PickPluginAndRequired<'renderMark'>;

export function CommonMarkRenderer(config: CommonMarkRendererConfig): CommonMarkRenderer {
  const { component: Component } = config;

  return {
    renderMark(props, _, next) {
      const { children, attributes } = props;

      if (config.type !== props.mark.type) {
        return next();
      }

      return <Component {...attributes}>{children}</Component>;
    }
  };
}
