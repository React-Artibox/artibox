import React, { forwardRef } from 'react';
import { HEADING_COMPONENTS } from '../constants';
import { HeadingProps } from '../typings';

/**
 * Default component of both renderer of editor and jsx serializer rule of heading.
 */
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
