import React, { forwardRef } from 'react';
import Tooltip from '@artibox/components/Tooltip';
import { LinkProps } from '../../typings';

/**
 * Default component for renderer of link in editor.
 */
const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ children, href, target, ...props }, ref) => (
  <Tooltip popup={href}>
    <a {...props} ref={ref} href={href} target={target}>
      {children}
    </a>
  </Tooltip>
));

export default Link;
