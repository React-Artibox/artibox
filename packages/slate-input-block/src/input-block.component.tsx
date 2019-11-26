import React, { CSSProperties, forwardRef } from 'react';
import { RenderAttributes } from 'slate-react';
import { useLocale } from '@artibox/components/locale';
import { InputBlockData } from './input-block.types';

export interface InputBlockProps extends RenderAttributes {
  isEmpty: boolean;
  getPlaceholder: InputBlockData['getPlaceholder'];
}

const inputBlockStyle: CSSProperties = {
  width: '100%',
  overflow: 'auto',
  whiteSpace: 'nowrap'
};

const placeholderStyle: CSSProperties = {
  pointerEvents: 'none',
  display: 'inline-block',
  width: '0',
  maxWidth: '100%',
  whiteSpace: 'nowrap',
  opacity: '0.333',
  verticalAlign: 'text-top'
};

const InputBlock = forwardRef<HTMLDivElement, InputBlockProps>(
  ({ children, isEmpty, getPlaceholder, ...props }, ref) => {
    const locale = useLocale();
    const placeholder = getPlaceholder(locale);

    return (
      <div ref={ref} style={inputBlockStyle} {...props}>
        {isEmpty && (
          <span contentEditable={false} style={placeholderStyle}>
            {placeholder}
          </span>
        )}
        {children}
      </div>
    );
  }
);

export default InputBlock;
