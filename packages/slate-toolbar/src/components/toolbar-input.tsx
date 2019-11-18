import React, { Dispatch, SetStateAction, KeyboardEventHandler } from 'react';
import { EditorPassable } from '@artibox/slate-renderer';
import { ToolInputable } from '../toolbar.types';

export interface ToolbarInputProps extends EditorPassable {
  inputableTool: ToolInputable;
  setInputableTool: Dispatch<SetStateAction<ToolInputable | null>>;
}

function ToolbarInput({ editor, inputableTool, setInputableTool }: ToolbarInputProps) {
  const ref = (input: HTMLInputElement) => {
    if (input) {
      input.focus();
    }
  };
  const exitInputAndFocus = () => {
    setInputableTool(null);
    editor.focus();
  };
  const onKeyDown: KeyboardEventHandler = event => {
    if (!inputableTool) {
      return;
    }

    const { onConfirm } = inputableTool;

    if (event.key === 'Enter') {
      event.preventDefault();
      onConfirm(editor, (event.target as HTMLInputElement).value);
      exitInputAndFocus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      exitInputAndFocus();
    }
  };

  return <input ref={ref} className="artibox-toolbar__input" onKeyDown={onKeyDown} onBlur={exitInputAndFocus} />;
}

export default ToolbarInput;
