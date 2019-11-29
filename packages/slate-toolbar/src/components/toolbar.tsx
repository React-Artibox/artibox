import React, { useRef, useLayoutEffect, useState } from 'react';
import { Editor } from 'slate-react';
import cx from 'classnames';
import { WithEditor, InputData } from '@artibox/slate-common';
import { useTheme } from '@artibox/components/theme';
import Portal from '@artibox/components/Portal';
import { TOOLBAR_DIVIDER } from '../constants';
import { Tool } from '../types';
import Divider from './divider';
import ToolbarIcon from './toolbar-icon';
import ToolbarInput from './toolbar-input';
import { clsPrefix } from './constants';

function roundNumber(value: number, min: number, max: number) {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  }

  return value;
}

function calculatePosition(el: HTMLElement, editor: Editor, expanded?: boolean) {
  const native = window.getSelection();
  const range = native!.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  const top = rect.top + window.pageYOffset - el.offsetHeight;
  let left: number;

  if (expanded) {
    left = roundNumber(
      rect.left + window.pageXOffset - (el.offsetWidth - rect.width) / 2,
      0,
      window.innerWidth - el.offsetWidth
    );
  } else {
    const editorEl: HTMLElement = (editor as any).el;
    left = editorEl.getBoundingClientRect().right - el.offsetWidth;
  }

  return { top, left };
}

export interface ToolbarProps extends WithEditor {
  collapsedTools?: Tool[];
  expandedTools?: Tool[];
}

function Toolbar({ collapsedTools, expandedTools, editor }: ToolbarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [toolInput, setToolInput] = useState<InputData | null>(null);
  const { fragment, selection } = editor.value;
  const { isFocused, isExpanded } = selection;
  const focusTextEmpty = fragment.text === '';
  const expanded = !!((isExpanded || toolInput) && !focusTextEmpty && expandedTools);
  const collapsed = !expanded && isFocused && collapsedTools;
  let tools: Tool[] | undefined;

  if (expanded) {
    tools = expandedTools;
  } else if (collapsed) {
    tools = collapsedTools;
  }

  useLayoutEffect(() => {
    if (!isFocused || toolInput) {
      return;
    }

    function handler() {
      const el = ref.current;

      if (!el) {
        return;
      }

      const { top, left } = calculatePosition(el, (editor as any) as Editor, expanded);

      el.style.top = `${top}px`;
      el.style.left = `${left}px`;
    }

    if (expanded) {
      handler();
    } else {
      window.requestAnimationFrame(handler);
    }
  });

  if (!tools) {
    return null;
  }

  return (
    <Portal>
      <div ref={ref} className={cx(clsPrefix, theme)}>
        {tools.map((tool, index) => {
          if (tool === TOOLBAR_DIVIDER) {
            return <Divider key={index} />;
          }

          const { icon, hook } = tool;

          return <ToolbarIcon key={icon.name} icon={icon} hook={hook} editor={editor} setToolInput={setToolInput} />;
        })}
        {expanded && toolInput && <ToolbarInput editor={editor} toolInput={toolInput} setToolInput={setToolInput} />}
      </div>
    </Portal>
  );
}

export default Toolbar;
