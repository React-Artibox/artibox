import React, { CSSProperties, forwardRef } from 'react';
import { useLocale } from '@artibox/components/locale';
import { InputBlockProps } from '../typings';
import '../styles';

const placeholderStyle: CSSProperties = {
  pointerEvents: 'none',
  display: 'inline-block',
  width: 0,
  maxWidth: '100%',
  whiteSpace: 'nowrap',
  verticalAlign: 'text-top'
};

const InputBlock = forwardRef<HTMLDivElement, InputBlockProps>(
  ({ children, isEmpty, getPlaceholder, ...props }, ref) => {
    const locale = useLocale();
    const placeholder = getPlaceholder(locale);

    return (
      <div ref={ref} className="artibox-input-block" {...props}>
        {isEmpty && (
          <span className="artibox-input-block__placeholder" contentEditable={false} style={placeholderStyle}>
            {placeholder}
          </span>
        )}
        {children}
      </div>
    );
  }
);

export default InputBlock;
