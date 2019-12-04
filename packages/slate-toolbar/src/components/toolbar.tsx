import React, { useRef, useLayoutEffect, useState } from 'react';
import cx from 'classnames';
import { WithEditor, InputConfig } from '@artibox/slate-common';
import { useTheme } from '@artibox/components/theme';
import Portal from '@artibox/components/Portal';
import { TOOLBAR_DIVIDER } from '../constants';
import { Tool, WithTools } from '../typings';
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

/**
 * @todo
 * Also round top.
 */
function calculatePosition(el: HTMLElement) {
  const native = window.getSelection();
  const range = native!.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  const top = rect.top + window.pageYOffset - el.offsetHeight;
  const left = roundNumber(
    rect.left + window.pageXOffset - (el.offsetWidth - rect.width) / 2,
    0,
    window.innerWidth - el.offsetWidth
  );

  return { top, left };
}

export type ToolbarProps = WithEditor & WithTools;

function Toolbar({ collapsedTools, expandedTools, editor }: ToolbarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [toolInput, setToolInput] = useState<InputConfig | null>(null);
  const { fragment, selection } = editor.value;
  const { isFocused, isExpanded } = selection;
  const focusTextEmpty = fragment.text === '';
  /**
   * If the tool input process start, the editor will be blurred so that toolbar will hide.
   * To avoid this issue, add `|| toolInput` to the condition.
   */
  const expanded = !!(((isExpanded && isFocused) || toolInput) && !focusTextEmpty && expandedTools);
  const collapsed = !!(((!isExpanded && isFocused) || toolInput) && collapsedTools);
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

      const { top, left } = calculatePosition(el);

      el.style.top = `${top}px`;
      el.style.left = `${left}px`;
    }

    if (expanded) {
      handler();
    } else {
      /**
       * While this effect fired, the native selection is not synchronize sometimes.
       * To avoid the issue, we just invoke the handler on next frame.
       */
      window.requestAnimationFrame(handler);
    }
  });

  if (!tools) {
    return null;
  }

  return (
    <Portal>
      <div ref={ref} className={cx(`${clsPrefix}__wrapper`, theme)}>
        <div className={`${clsPrefix}__arrow`} />
        <div className={clsPrefix}>
          {tools.map((tool, index) => {
            if (tool === TOOLBAR_DIVIDER) {
              return <Divider key={index} />;
            }

            const { icon, hook } = tool;

            return <ToolbarIcon key={icon.name} icon={icon} hook={hook} editor={editor} setToolInput={setToolInput} />;
          })}
          {toolInput && <ToolbarInput editor={editor} toolInput={toolInput} setToolInput={setToolInput} />}
        </div>
      </div>
    </Portal>
  );
}

export default Toolbar;
