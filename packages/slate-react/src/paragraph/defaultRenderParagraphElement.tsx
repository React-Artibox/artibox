import React from 'react';
import { RenderElementProps } from '../core';

export const defaultRenderParagraphElement = ({
  attributes,
  children
}: {
  attributes?: RenderElementProps['attributes'];
  children: any;
}) => <p {...attributes}>{children}</p>;
