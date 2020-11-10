import React from 'react';
import { RenderDividerElement } from './typings';

export const defaultRenderDividerElement: RenderDividerElement = ({ attributes, children }) => (
  <div {...attributes} contentEditable={false}>
    <hr />
    {children}
  </div>
);
