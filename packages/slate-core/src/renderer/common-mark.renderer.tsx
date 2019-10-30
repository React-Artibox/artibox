import React, { ReactHTML, ComponentType } from 'react';
import { RenderAttributes } from 'slate-react';
import { PickPluginProps } from '../plugin.types';

export interface CommonMarkRendererConfig {
  type: string;
  component: keyof ReactHTML | ComponentType<RenderAttributes>;
}

export type CommonMarkRenderer = PickPluginProps<'renderMark'>;

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
