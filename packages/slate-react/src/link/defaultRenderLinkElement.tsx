import React from 'react';
import Tooltip from '../components/Tooltip';
import { RenderLinkElementProps } from './typings';

/**
 * Set placement of tooltip to `bottom` to avoid conflicting w/ toolbar.
 */
export const defaultRenderLinkElement = ({
  attributes,
  children,
  element,
  placement = 'bottom',
  target = '_blank'
}: RenderLinkElementProps & {
  placement?: 'top' | 'bottom';
  target?: string;
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
