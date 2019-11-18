import React, { Dispatch, SetStateAction, MouseEventHandler, memo, useCallback } from 'react';
import cx from 'classnames';
import { IconDefinition } from '@artibox/icons';
import { Icon } from '@artibox/components';
import { EditorPassable } from '@artibox/slate-renderer';
import { TOOLBAR_DIVIDER } from '../toolbar.constants';
import { Tool, ToolInputable } from '../toolbar.types';

interface ToolbarIconInnerProps {
  active: boolean;
  onMouseDown: MouseEventHandler;
  icon: IconDefinition;
}

const ToolbarIconInner = memo<ToolbarIconInnerProps>(
  ({ active, onMouseDown, icon }) => (
    <span
      className={cx('artibox-toolbar__icon', { 'artibox-toolbar__icon--active': active })}
      onMouseDown={onMouseDown}
    >
      <Icon icon={icon} />
    </span>
  ),
  (prev, next) => prev.active === next.active && prev.onMouseDown === next.onMouseDown && prev.icon === next.icon
);

export interface ToolbarIconProps extends EditorPassable {
  icon: Exclude<Tool, TOOLBAR_DIVIDER>[0];
  config: Exclude<Tool, TOOLBAR_DIVIDER>[1];
  setInputableTool: Dispatch<SetStateAction<ToolInputable | null>>;
}

function ToolbarIcon({ icon, config, editor, setInputableTool }: ToolbarIconProps) {
  const { isActive, onMouseDown: onMouseDownFromConfig, inputable } = config;
  const active = isActive?.(editor) ?? false;
  const onMouseDown = useCallback<MouseEventHandler>(
    event => {
      event.preventDefault();

      if (inputable) {
        setInputableTool(inputable);
      } else {
        onMouseDownFromConfig?.(editor, event);
      }
    },
    [onMouseDownFromConfig, inputable, editor, setInputableTool]
  );

  return <ToolbarIconInner active={active} onMouseDown={onMouseDown} icon={icon} />;
}

export default ToolbarIcon;
