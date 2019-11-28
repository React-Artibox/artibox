import React from 'react';
import { RenderInlineProps, RenderAttributes, Plugin } from 'slate-react';
import { CreateCommonRendererConfig, NodeIsVoid } from '../typings/renderer';

export type CreateCommonInlineRendererConfig<
  P extends RenderAttributes = RenderAttributes
> = CreateCommonRendererConfig<RenderInlineProps, P> & NodeIsVoid;

export function createCommonInlineRenderer<P extends RenderAttributes = RenderAttributes>(
  config: CreateCommonInlineRendererConfig<P>
): Plugin {
  const { type, component, getProps, isVoid = false } = config;
  const Component = component as any;

  return {
    renderInline(props, _, next) {
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
