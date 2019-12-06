import React, { forwardRef } from 'react';
import { RendererBaseComponent } from '@artibox/slate-common';

const CustomBlockquote: RendererBaseComponent = forwardRef<HTMLDivElement>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} className="artibox-stories-elements__blockquote" {...props}>
      <div className="artibox-stories-elements__blockquote__line" contentEditable={false} />
      {children}
    </div>
  );
});

export default CustomBlockquote;
