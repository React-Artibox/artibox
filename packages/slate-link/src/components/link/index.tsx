import React, { forwardRef } from 'react';
import Tooltip from '@artibox/components/Tooltip';
import { LinkProps } from '../../typings';

/**
 * Default component for renderer of link in editor.
 * Set placement of tooltip to `bottom` to avoid conflicting w/ toolbar.
 */
const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ children, href, target, ...props }, ref) => (
  <Tooltip placement="bottom" popup={href}>
    <a {...props} ref={ref} href={href} target={target}>
      {children}
    </a>
  </Tooltip>
));

export default Link;
