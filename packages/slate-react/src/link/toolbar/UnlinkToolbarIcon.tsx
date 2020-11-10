import React from 'react';
import { ToolbarIcon, ToolbarIconProps } from '../../toolbar';
import { ReactLink } from '../typings';
import { useUnlinkTool } from './useUnlinkTool';

export interface UnlinkToolbarIconProps extends Omit<ToolbarIconProps, 'active' | 'onClick'> {
  controller: ReactLink;
}

function UnlinkToolbarIcon(props: UnlinkToolbarIconProps) {
  const { controller, ...rest } = props;
  const { onClick } = useUnlinkTool(controller);

  return <ToolbarIcon {...rest} onClick={onClick} />;
}

export default UnlinkToolbarIcon;
