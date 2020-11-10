import React from 'react';
import { ListRootTypeKey } from '@artibox/slate-common/list';
import { ToolbarIcon, ToolbarIconProps } from '../../toolbar';
import { ReactList } from '../typings';
import { useListTool } from './useListTool';

export interface ListToolbarIconProps extends Omit<ToolbarIconProps, 'active' | 'onClick'> {
  controller: ReactList;
  listTypeKey: ListRootTypeKey;
}

function ListToolbarIcon(props: ListToolbarIconProps) {
  const { controller, listTypeKey, ...rest } = props;
  const { active, onClick } = useListTool(controller, listTypeKey);

  return <ToolbarIcon {...rest} active={active} onClick={onClick} />;
}

export default ListToolbarIcon;
