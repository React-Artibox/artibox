import React from 'react';
import { ToolbarIcon, ToolbarIconProps } from '../../toolbar';
import { ReactDivider } from '../typings';
import { useDividerTool } from './useDividerTool';

export interface DividerToolbarIconProps extends Omit<ToolbarIconProps, 'active' | 'onClick'> {
  controller: ReactDivider;
}

function DividerToolbarIcon(props: DividerToolbarIconProps) {
  const { controller, ...rest } = props;
  const { onClick } = useDividerTool(controller);

  return <ToolbarIcon {...rest} onClick={onClick} />;
}

export default DividerToolbarIcon;
