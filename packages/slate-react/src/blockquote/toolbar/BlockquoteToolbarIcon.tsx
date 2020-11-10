import React from 'react';
import { ToolbarIcon, ToolbarIconProps } from '../../toolbar';
import { ReactBlockquote } from '../typings';
import { useBlockquoteTool } from './useBlockquoteTool';

export interface BlockquoteToolbarIconProps extends Omit<ToolbarIconProps, 'active' | 'onClick'> {
  controller: ReactBlockquote;
}

function BlockquoteToolbarIcon(props: BlockquoteToolbarIconProps) {
  const { controller, ...rest } = props;
  const { active, onClick } = useBlockquoteTool(controller);

  return <ToolbarIcon {...rest} active={active} onClick={onClick} />;
}

export default BlockquoteToolbarIcon;
