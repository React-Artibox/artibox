import React from 'react';
import { PickPluginAndRequired } from '@artibox/slate-common';
import { HEADING_COMPONENTS } from './heading.constants';
import { getHeadingLevelFromBlock } from './heading.utils';

export type HeadingRenderer = PickPluginAndRequired<'renderBlock'>;

export function HeadingRenderer(type: string): HeadingRenderer {
  return {
    renderBlock(props, _, next) {
      const { children, attributes } = props;

      if (type !== props.node.type) {
        return next();
      }

      const level = getHeadingLevelFromBlock(props.node);

      if (level === undefined) {
        return next();
      }

      const Component = HEADING_COMPONENTS[level];

      return <Component {...attributes}>{children}</Component>;
    }
  };
}
