import React from 'react';
import { HeadingLevel } from '@artibox/slate-common/heading';
import { ToolbarIcon, ToolbarIconProps } from '../../toolbar';
import { ReactHeading } from '../typings';
import { useToggleHeadingTool } from './useToggleHeadingTool';

export interface HeadingToolbarIconProps<L extends HeadingLevel, VL extends L>
  extends Omit<ToolbarIconProps, 'active' | 'onClick'> {
  controller: ReactHeading<L>;
  level: VL;
}

function HeadingToolbarIcon<L extends HeadingLevel, VL extends L>(props: HeadingToolbarIconProps<L, VL>) {
  const { controller, level, ...rest } = props;
  const { active, onClick } = useToggleHeadingTool(controller, level);

  return <ToolbarIcon {...rest} active={active} onClick={onClick} />;
}

export default HeadingToolbarIcon;
