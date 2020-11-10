import React from 'react';
import { JsxSerializeLinkElementProps } from './typings';

export const defaultRenderLinkElement = ({ children, element }: JsxSerializeLinkElementProps) => (
  <a target="_blank" href={element.url}>
    {children}
  </a>
);
