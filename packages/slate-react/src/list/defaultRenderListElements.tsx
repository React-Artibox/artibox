import React from 'react';
import { RenderElementProps } from 'slate-react';
import { ListTypeKey } from '@artibox/slate-common/list/common';

export const defaultRenderListElements: Record<
  ListTypeKey,
  (props: { attributes?: RenderElementProps['attributes']; children: any }) => JSX.Element
> = {
  ol: ({ attributes, children }) => <ol {...attributes}>{children}</ol>,
  ul: ({ attributes, children }) => <ul {...attributes}>{children}</ul>,
  li: ({ attributes, children }) => <li {...attributes}>{children}</li>
};
