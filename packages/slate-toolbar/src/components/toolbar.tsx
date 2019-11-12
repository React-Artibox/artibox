import React, { useRef, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { Editor } from 'slate-react';
import cx from 'classnames';
import { EditorPassable } from '@artibox/slate-renderer';
import { useTheme } from '@artibox/slate-editor';
import { TOOLBAR_DIVIDER } from '../toolbar.constants';
import { Tool } from '../toolbar.types';
import Divider from './divider';
import ToolbarIcon from './toolbar-icon';

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
  tools: Tool[];
  expanded?: boolean;
}

function Toolbar({ tools, editor, expanded }: ToolbarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  useLayoutEffect(() => {
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

  return ReactDOM.createPortal(
    <div ref={ref} className={cx('artibox-toolbar', theme)}>
      {tools.map((tool, index) => {
        if (tool === TOOLBAR_DIVIDER) {
          return <Divider key={index} />;
        }

        const [icon, hooks] = tool;

        return <ToolbarIcon key={icon.name} icon={icon} hooks={hooks} editor={editor} />;
      })}
    </div>,
    document.body
  );
}

export default Toolbar;
