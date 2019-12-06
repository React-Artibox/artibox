import React, { memo, MouseEventHandler } from 'react';
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

const preventDefault: MouseEventHandler = event => event.preventDefault();

const ToolbarIconInner = memo<ToolbarIconInnerProps>(
  ({ active, onClick, icon }) => (
    <span
      className={cx(`${clsPrefix}__icon`, { [`${clsPrefix}__icon--active`]: active })}
      onClick={onClick}
      onMouseDown={preventDefault}
    >
      <Icon icon={icon} />
    </span>
  ),
  (prev, next) => prev.active === next.active && prev.onClick === next.onClick && prev.icon === next.icon
);

export interface ToolbarIconProps extends WithEditor, Exclude<Tool, TOOLBAR_DIVIDER> {
  setToolInput: SetInputConfig;
}

function ToolbarIcon({ icon, hook, editor, setToolInput }: ToolbarIconProps) {
  const { active, onClick } = hook(editor, setToolInput);
  return <ToolbarIconInner active={active} onClick={onClick} icon={icon} />;
}

export default ToolbarIcon;
