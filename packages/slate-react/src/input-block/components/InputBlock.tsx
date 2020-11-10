import React from 'react';
import { RenderInputBlockElementProps } from '../typings';
import { useInputBlock } from '../hooks/useInputBlock';

function InputBlock(props: RenderInputBlockElementProps) {
  const { attributes, children } = props;
  const { inputRef, onBlur, onKeyDown, placeholder } = useInputBlock(props);

  return (
    <div
      {...attributes}
      contentEditable={false}
      style={{
        display: 'flex'
      }}
    >
      <input
        ref={inputRef}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        style={{
          display: 'block',
          color: 'currentColor',
          font: 'inherit',
          width: '100%',
          margin: 0,
          border: 0,
          padding: 0,
          background: 'none',
          outline: 0,
          boxSizing: 'border-box'
        }}
      />
      {children}
    </div>
  );
}

export default InputBlock;
