import { useCallback } from 'react';
import { NodeType, ForPlugin, ForToolHook } from '@artibox/slate-common';
import {
  CreateCommonBlockRendererConfig,
  createCommonBlockRenderer
} from '@artibox/slate-common/renderers/common-block';
import { BLOCKQUOTE_TYPE, BLOCKQUOTE_HOTKEY, BLOCKQUOTE_COMPONENT } from './constants';
import { BlockquoteController, createBlockquoteController } from './controller';
import { CreateBlockquoteHandlersConfig, createBlockquoteHandlers } from './handlers';

export type BlockquoteForPluginConfig = Partial<
  Omit<CreateBlockquoteHandlersConfig & Pick<CreateCommonBlockRendererConfig, 'component'>, 'controller'>
>;

export interface BlockquoteForToolHookConfig {
  /**
   * The command of controller of blockquote will be triggered after clicked.
   */
  command?: 'wrap' | 'unwrap' | 'toggle';
  /**
   * A flag to determine whether to provide active.
   */
  activeNotProvided?: boolean;
}

export type Blockquote = NodeType &
  BlockquoteController &
  ForPlugin<BlockquoteForPluginConfig> &
  ForToolHook<BlockquoteForToolHookConfig>;

export type CreatBlockquoteeConfig = Partial<NodeType>;

export function createBlockquote(config?: CreatBlockquoteeConfig): Blockquote {
  const { type = BLOCKQUOTE_TYPE } = config || {};
  const controller = createBlockquoteController({ type });
  return {
    type,
    ...controller,
    forPlugin(config) {
      const { hotkey = BLOCKQUOTE_HOTKEY, component = BLOCKQUOTE_COMPONENT } = config || {};
      return {
        ...createBlockquoteHandlers({ hotkey, controller }),
        ...createCommonBlockRenderer({ type, component })
      };
    },
    forToolHook(config) {
      const { command = 'toggle', activeNotProvided = false } = config || {};
      return editor => ({
        active: !activeNotProvided && controller.isSelectionIn(editor),
        onMouseDown: useCallback(() => controller[command](editor), [editor])
      });
    }
  };
}
