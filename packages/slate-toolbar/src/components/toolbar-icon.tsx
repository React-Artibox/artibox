import React, { memo } from 'react';
import cx from 'classnames';
import { IconDefinition } from '@artibox/icons';
import Icon from '@artibox/components/Icon';
import { WithEditor, SetInputConfig, ToolHook } from '@artibox/slate-common';
import { TOOLBAR_DIVIDER } from '../constants';
import { Tool } from '../typings';
import { clsPrefix } from './constants';

interface ToolbarIconInnerProps extends ReturnType<ToolHook> {
  icon: IconDefinition;
}

const ToolbarIconInner = memo<ToolbarIconInnerProps>(
  ({ active, onMouseDown, icon }) => (
    <span
      className={cx(`${clsPrefix}__icon`, { [`${clsPrefix}__icon--active`]: active })}
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

export interface ToolbarIconProps extends WithEditor, Exclude<Tool, TOOLBAR_DIVIDER> {
  setToolInput: SetInputConfig;
}

function ToolbarIcon({ icon, hook, editor, setToolInput }: ToolbarIconProps) {
  const { active, onMouseDown } = hook(editor, setToolInput);
  return <ToolbarIconInner active={active} onMouseDown={onMouseDown} icon={icon} />;
}

export default ToolbarIcon;
