import React from 'react';
import { RenderMarkProps, RenderAttributes, Plugin } from 'slate-react';
import { CreateCommonRendererConfig } from '../typings/renderer';

export type CreateCommonMarkRendererConfig<P extends RenderAttributes = RenderAttributes> = CreateCommonRendererConfig<
  RenderMarkProps,
  P
>;

export function createCommonMarkRenderer<P extends RenderAttributes = RenderAttributes>(
  config: CreateCommonMarkRendererConfig<P>
): Plugin {
  const { type, component, getProps } = config;
  const Component = component as any;

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
