import React, { KeyboardEventHandler } from 'react';
import { EditorPassable, ToolInput, SetToolInput } from '@artibox/slate-common';
import { useLocale } from '@artibox/components/locale';

export interface ToolbarInputProps extends EditorPassable {
  toolInput: ToolInput;
  setToolInput: SetToolInput;
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
    <input
      ref={ref}
      className="artibox-toolbar__input"
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      onBlur={exitInputAndFocus}
    />
  );
}

export default ToolbarInput;
