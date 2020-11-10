import React, { KeyboardEventHandler, KeyboardEvent, MouseEvent } from 'react';
import { useLocale } from '../../configs';
import { ToolInputConfig } from '../typings';
import './toolbar.styles';

export interface ToolbarInputProps {
  exit: VoidFunction;
  toolInput: ToolInputConfig;
}

function ToolbarInput({ exit, toolInput }: ToolbarInputProps) {
  const { confirm, getPlaceholder } = toolInput;
  const onExit = (event: KeyboardEvent | MouseEvent) => {
    event.preventDefault();
    exit();
  };
  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
    const isEnter = event.key === 'Enter';

    if (isEnter || event.key === 'Escape') {
      onExit(event);

      if (isEnter) {
        confirm((event.target as HTMLInputElement).value);
      }
    }
  };
  const locale = useLocale();
  const placeholder = getPlaceholder(locale);

  return (
    <div className="artibox-toolbar__input__wrapper">
      <input
        autoFocus
        className="artibox-toolbar__input"
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        onBlur={exit}
      />
      <svg className="artibox-toolbar__input__cross" viewBox="0 0 320 512" onMouseDown={onExit}>
        <path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" />
      </svg>
    </div>
  );
}

export default ToolbarInput;
