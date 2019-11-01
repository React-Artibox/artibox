import React from 'react';
import { Plugin } from 'slate-react';
import { Required } from 'utility-types';
import { HEADING_COMPONENTS } from './heading.constants';
import { getLevelFromBlock } from './heading.utils';

export type HeadingRenderer = Required<Plugin, 'renderBlock'>;

export function HeadingRenderer(type: string): HeadingRenderer {
  return {
    renderBlock(props, _, next) {
      const { children, attributes } = props;

      if (type !== props.node.type) {
        return next();
      }

      const level = getLevelFromBlock(props.node);

      if (level === undefined) {
        return next();
      }

      const Component = HEADING_COMPONENTS[level];

      return <Component {...attributes}>{children}</Component>;
    }
  };
}
