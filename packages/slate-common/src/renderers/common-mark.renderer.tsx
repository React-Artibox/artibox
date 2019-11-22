import React from 'react';
import { RenderMarkProps, RenderAttributes } from 'slate-react';
import { PickPluginAndRequired } from '../types/plugin.types';
import { CommonRendererConfig } from './renderer.interfaces';

export type CommonMarkRendererConfig<P extends RenderAttributes = RenderAttributes> = CommonRendererConfig<
  RenderMarkProps,
  P
>;

export type CommonMarkRenderer = PickPluginAndRequired<'renderMark'>;

export function CommonMarkRenderer<P extends RenderAttributes = RenderAttributes>(
  config: CommonMarkRendererConfig<P>
): CommonMarkRenderer {
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
