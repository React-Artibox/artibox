import React, { ReactHTML, ComponentType } from 'react';
import { RenderAttributes, RenderMarkProps } from 'slate-react';
import { MarkRenderer } from '@artibox/slate-core';

export type CommonMarkRendererConfigRenderIf = (config: CommonMarkRendererConfig, props: RenderMarkProps) => boolean;

export interface CommonMarkRendererConfig {
  type: string;
  component: keyof ReactHTML | ComponentType<RenderAttributes>;
  renderIf?: CommonMarkRendererConfigRenderIf;
}

export const defaultCommonMarkRenderIf: CommonMarkRendererConfigRenderIf = (config, props) =>
  config.type === props.mark.type;

export function CommonMarkRenderer(config: CommonMarkRendererConfig): MarkRenderer {
  const { component: Component, renderIf = defaultCommonMarkRenderIf } = config;

  return {
    object: 'mark',
    render(props, _, next) {
      const { children, attributes } = props;

      if (!renderIf(config, props)) {
        return next();
      }

      return <Component {...attributes}>{children}</Component>;
    }
  };
}
