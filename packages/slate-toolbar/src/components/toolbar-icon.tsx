import React, { memo } from 'react';
import cx from 'classnames';
import { IconDefinition } from '@artibox/icons';
import Icon from '@artibox/components/Icon';
import { EditorPassable, SetToolInput } from '@artibox/slate-common';
import { TOOLBAR_DIVIDER } from '../toolbar.constants';
import { Tool } from '../toolbar.types';

interface ToolbarIconInnerProps extends ReturnType<Exclude<Tool, TOOLBAR_DIVIDER>['hook']> {
  icon: IconDefinition;
}

const ToolbarIconInner = memo<ToolbarIconInnerProps>(
  ({ active, onMouseDown, icon }) => (
    <span
      className={cx('artibox-toolbar__icon', { 'artibox-toolbar__icon--active': active })}
      onMouseDown={event => {
        event.preventDefault();
        onMouseDown(event);
      }}
    >
      <Icon icon={icon} />
    </span>
  ),
  (prev, next) => prev.active === next.active && prev.onMouseDown === next.onMouseDown && prev.icon === next.icon
);

export interface ToolbarIconProps extends EditorPassable, Exclude<Tool, TOOLBAR_DIVIDER> {
  setToolInput: SetToolInput;
}

function ToolbarIcon({ icon, hook, editor, setToolInput }: ToolbarIconProps) {
  const { active, onMouseDown } = hook(editor, setToolInput);
  return <ToolbarIconInner active={active} onMouseDown={onMouseDown} icon={icon} />;
}

export default ToolbarIcon;
