import React, { KeyboardEventHandler } from 'react';
import { WithEditor, InputData, SetInputData } from '@artibox/slate-common';
import { useLocale } from '@artibox/components/locale';
import { clsPrefix } from './constants';

export interface ToolbarInputProps extends WithEditor {
  toolInput: InputData;
  setToolInput: SetInputData;
}

function ToolbarInput({ editor, toolInput, setToolInput }: ToolbarInputProps) {
  const ref = (input: HTMLInputElement) => {
    if (input) {
      input.focus();
    }
  };
  const exitInputAndFocus = () => {
    setToolInput(null);
    editor.focus();
  };
  const onKeyDown: KeyboardEventHandler = event => {
    if (!toolInput) {
      return;
    }

    const { onConfirm } = toolInput;

    if (event.key === 'Enter') {
      event.preventDefault();
      onConfirm(editor, (event.target as HTMLInputElement).value);
      exitInputAndFocus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      exitInputAndFocus();
    }
  };
  const { getPlaceholder } = toolInput;
  const locale = useLocale();
  const placeholder = getPlaceholder(locale);

  return (
    <div className={`${clsPrefix}__input__wrapper`}>
      <input
        ref={ref}
        className={`${clsPrefix}__input`}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        onBlur={exitInputAndFocus}
      />
      <svg className={`${clsPrefix}__input__cross`} viewBox="0 0 320 512" onClick={exitInputAndFocus}>
        <path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" />
      </svg>
    </div>
  );
}

export default ToolbarInput;
