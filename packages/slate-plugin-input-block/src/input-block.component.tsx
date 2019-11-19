import React, { CSSProperties, forwardRef } from 'react';
import { RenderAttributes } from 'slate-react';

export interface InputBlockProps extends RenderAttributes {
  isEmpty: boolean;
}

const placeholderStyle: CSSProperties = {
  pointerEvents: 'none',
  display: 'inline-block',
  width: '0',
  maxWidth: '100%',
  whiteSpace: 'nowrap',
  opacity: '0.333',
  verticalAlign: 'text-top'
};

const InputBlock = forwardRef<HTMLDivElement, InputBlockProps>(({ children, isEmpty, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {isEmpty && (
        <span contentEditable={false} style={placeholderStyle}>
          placeholder!!!!
        </span>
      )}
      {children}
    </div>
  );
});

export default InputBlock;
