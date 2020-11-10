import React from 'react';
import { RenderElementProps } from 'slate-react';

export const defaultRenderBlockquoteElement = ({
  attributes,
  children
}: {
  attributes?: RenderElementProps['attributes'];
  children: RenderElementProps['children'];
}) => <blockquote {...attributes}>{children}</blockquote>;
