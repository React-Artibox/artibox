import React from 'react';
import { HeadingLevel } from '@artibox/slate-common/heading';
import { ToolbarIcon, ToolbarIconProps } from '../../toolbar';
import { ReactHeading } from '../typings';
import { useToggleHeadingTool } from './useToggleHeadingTool';

export interface HeadingToolbarIconProps<Level extends HeadingLevel, ValidLevel extends Level>
  extends Omit<ToolbarIconProps, 'active' | 'onClick'> {
  controller: ReactHeading<Level>;
  level: ValidLevel;
}

function HeadingToolbarIcon<Level extends HeadingLevel, ValidLevel extends Level>(
  props: HeadingToolbarIconProps<Level, ValidLevel>
) {
  const { controller, level, ...rest } = props;
  const { active, onClick } = useToggleHeadingTool(controller, level);

  return <ToolbarIcon {...rest} active={active} onClick={onClick} />;
}

export default HeadingToolbarIcon;
