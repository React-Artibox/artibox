import React from 'react';
import { ToolbarIcon, ToolbarIconProps } from '../../toolbar';
import { ReactLink } from '../typings';
import { useLinkTool, UseLinkToolOptions } from './useLinkTool';

export interface LinkToolbarIconProps extends Omit<ToolbarIconProps, 'active' | 'onClick'> {
  controller: ReactLink;
  options?: UseLinkToolOptions;
}

function LinkToolbarIcon(props: LinkToolbarIconProps) {
  const { controller, options = {}, ...rest } = props;
  const { active, onClick } = useLinkTool(controller, options);

  return <ToolbarIcon {...rest} active={active} onClick={onClick} />;
}

export default LinkToolbarIcon;
