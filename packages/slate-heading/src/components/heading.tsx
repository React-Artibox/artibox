import React, { forwardRef } from 'react';
import { HEADING_COMPONENTS } from '../constants';
import { HeadingProps } from '../types';

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(({ children, level, ...props }, ref) => {
  if (level === undefined) {
    return <>{children}</>;
  }

  const Component = HEADING_COMPONENTS[level];

  return (
    <Component ref={ref} {...props}>
      {children}
    </Component>
  );
});

export default Heading;
