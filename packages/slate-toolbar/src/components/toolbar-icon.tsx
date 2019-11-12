import React from 'react';
import cx from 'classnames';
import { Icon } from '@artibox/components';
import { EditorPassable } from '@artibox/slate-renderer';
import { TOOLBAR_DIVIDER } from '../toolbar.constants';
import { Tool } from '../toolbar.types';

export interface ToolbarIconProps extends EditorPassable {
  icon: Exclude<Tool, TOOLBAR_DIVIDER>[0];
  hooks: Exclude<Tool, TOOLBAR_DIVIDER>[1];
}

function ToolbarIcon({ icon, hooks, editor }: ToolbarIconProps) {
  const [useOnMouseDown, useActive] = hooks;
  const active = useActive?.(editor) ?? false;
  const onMouseDown = useOnMouseDown(editor);

  return (
    <span
      className={cx('artibox-toolbar__icon', { 'artibox-toolbar__icon--active': active })}
      onMouseDown={onMouseDown}
    >
      <Icon icon={icon} />
    </span>
  );
}

export default ToolbarIcon;
