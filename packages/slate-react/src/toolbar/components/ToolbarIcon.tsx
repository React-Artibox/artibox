import React from 'react';
import clsx from 'clsx';
import Icon, { IconProps } from '../../components/Icon';
import './toolbar.styles';

export interface ToolbarIconProps extends Omit<IconProps, 'ref'> {
  active?: boolean;
}

function ToolbarIcon(props: ToolbarIconProps) {
  const { active, className, onMouseDown, ...rest } = props;

  return (
    <Icon
      {...rest}
      className={clsx('artibox-toolbar__icon', { ['artibox-toolbar__icon--active']: active }, className)}
      onMouseDown={event => {
        event.preventDefault();
        onMouseDown?.(event);
      }}
    />
  );
}

export default ToolbarIcon;
