import React from 'react';
import { RenderElementProps } from 'slate-react';
import { HeadingElement } from '@artibox/slate-common/heading/common';

export const HEADING_COMPONENTS = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6'
} as const;

export const defaultRenderHeadingElement = ({
  attributes,
  children,
  element
}: {
  attributes?: RenderElementProps['attributes'];
  children: RenderElementProps['children'];
  element: HeadingElement;
}) => {
  const Component = HEADING_COMPONENTS[element.level];

  if (!Component) {
    return null;
  }

  return <Component {...attributes}>{children}</Component>;
};
