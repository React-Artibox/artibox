import React from 'react';
import { RenderDividerElementProps } from './typings';

export const defaultRenderDividerElement = ({ attributes, children }: RenderDividerElementProps) => (
  <div {...attributes} contentEditable={false}>
    <hr />
    {children}
  </div>
);
