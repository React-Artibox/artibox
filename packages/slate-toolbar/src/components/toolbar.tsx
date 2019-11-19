import React, { useRef, useLayoutEffect, useState } from 'react';
import { Editor } from 'slate-react';
import cx from 'classnames';
import { EditorPassable } from '@artibox/slate-renderer';
import { Portal, useTheme } from '@artibox/components';
import { TOOLBAR_DIVIDER } from '../toolbar.constants';
import { Tool, ToolInputable } from '../toolbar.types';
import Divider from './divider';
import ToolbarIcon from './toolbar-icon';
import ToolbarInput from './toolbar-input';

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

export interface ToolbarProps extends EditorPassable {
  collapsedTools?: Tool[];
  expandedTools?: Tool[];
}

function Toolbar({ collapsedTools, expandedTools, editor }: ToolbarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [inputableTool, setInputableTool] = useState<ToolInputable | null>(null);
  const { fragment, selection } = editor.value;
  const { isFocused, isExpanded } = selection;
  const focusTextEmpty = fragment.text === '';
  const expanded = !!((isExpanded || inputableTool) && !focusTextEmpty && expandedTools);
  const collapsed = !expanded && isFocused && collapsedTools;
  let tools: Tool[] | undefined;

  if (expanded) {
    tools = expandedTools;
  } else if (collapsed) {
    tools = collapsedTools;
  }

  useLayoutEffect(() => {
    if (!isFocused || inputableTool) {
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
      <div ref={ref} className={cx('artibox-toolbar', theme)}>
        {tools.map((tool, index) => {
          if (tool === TOOLBAR_DIVIDER) {
            return <Divider key={index} />;
          }

          const [icon, config] = tool;

          return (
            <ToolbarIcon
              key={icon.name}
              icon={icon}
              config={config}
              editor={editor}
              setInputableTool={setInputableTool}
              expanded={expanded}
            />
          );
        })}
        {expanded && inputableTool && (
          <ToolbarInput editor={editor} inputableTool={inputableTool} setInputableTool={setInputableTool} />
        )}
      </div>
    </Portal>
  );
}

export default Toolbar;
