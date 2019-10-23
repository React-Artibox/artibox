import React, { ReactHTML, ComponentType } from 'react';
import { RenderAttributes, RenderMarkProps } from 'slate-react';
import { MarkRenderer } from '../types';

export interface RenderCommonMarkProps extends RenderAttributes {}

export type RenderCommonMarkConfigRenderIf = (config: RenderCommonMarkConfig, props: RenderMarkProps) => boolean;

export interface RenderCommonMarkConfig {
  type: string;
  component: keyof ReactHTML | ComponentType<RenderCommonMarkProps>;
  renderIf?: RenderCommonMarkConfigRenderIf;
}

export const defaultCommonMarkRenderIf: RenderCommonMarkConfigRenderIf = (config, props) =>
  config.type === props.mark.type;

export function RenderCommonMark(config: RenderCommonMarkConfig): MarkRenderer {
  const { component: Component, renderIf = defaultCommonMarkRenderIf } = config;

  return {
    renderMark(props, _, next) {
      const { children, attributes } = props;

      if (!renderIf(config, props)) {
        return next();
      }

      return <Component {...attributes}>{children}</Component>;
    }
  };
}
