import React from 'react';
import { Editor } from 'slate';
import { InputWidgetConfig } from '@artibox/slate-common/input-widget';
import { ToolbarIcon, ToolbarIconProps } from '../../toolbar';
import { ReactEmbed } from '../typings';
import { useEmbedTool } from './useEmbedTool';

export interface EmbedToolbarIconProps<Provider extends string>
  extends Omit<ToolbarIconProps, 'active' | 'onClick'>,
    Pick<InputWidgetConfig, 'getPlaceholder'> {
  controller: ReactEmbed<Provider>;
  /**
   * The providers supported by this icon.
   */
  providers: Provider[];
  startToolInput?: (editor: Editor, inputConfig: InputWidgetConfig) => void;
}

function EmbedToolbarIcon<Provider extends string>(props: EmbedToolbarIconProps<Provider>) {
  const { controller, providers, getPlaceholder, startToolInput, ...rest } = props;
  const { onClick } = useEmbedTool(controller, providers, getPlaceholder, startToolInput);

  return <ToolbarIcon {...rest} onClick={onClick} />;
}

export default EmbedToolbarIcon;
