import React from 'react';
import { PickPluginAndRequired } from '@artibox/slate-common';
import { LIST_TYPES, LIST_COMPONENTS } from './list.constants';

export interface ListRendererConfig {
  types?: LIST_TYPES;
}

export type ListRenderer = PickPluginAndRequired<'renderBlock'>;

export function ListRenderer(config?: ListRendererConfig): ListRenderer {
  const types = { ...LIST_TYPES, ...config?.types };
  const componentMap = {
    [types.unordered]: LIST_COMPONENTS.unordered,
    [types.ordered]: LIST_COMPONENTS.ordered,
    [types.item]: LIST_COMPONENTS.item
  };

  return {
    renderBlock(props, _, next) {
      const Component: LIST_COMPONENTS[keyof LIST_COMPONENTS] | undefined = componentMap[props.node.type];

      if (!Component) {
        return next();
      }

      const { children, attributes } = props;

      return <Component {...attributes}>{children}</Component>;
    }
  };
}
