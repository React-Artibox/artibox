import React from 'react';
import Tooltip from '../components/Tooltip';
import { RenderLinkElement } from './typings';

/**
 * Set placement of tooltip to `bottom` to avoid conflicting w/ toolbar.
 */
export const defaultRenderLinkElement: RenderLinkElement = ({
  attributes,
  children,
  element,
  placement = 'bottom',
  target = '_blank'
}) => {
  const { url } = element;

  return (
    <Tooltip placement={placement} popup={url}>
      <a {...attributes} href={url} target={target}>
        {children}
      </a>
    </Tooltip>
  );
};
