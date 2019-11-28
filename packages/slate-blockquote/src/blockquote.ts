import { useCallback } from 'react';
import { NodeType, ForPlugin, ForToolHook } from '@artibox/slate-common';
import { BLOCKQUOTE_TYPE, BLOCKQUOTE_HOTKEY, BLOCKQUOTE_COMPONENT } from './constants';
import { BlockquoteController, createBlockquoteController } from './controller';
import { CreateBlockquoteHandlersConfig, createBlockquoteHandlers } from './handlers';
import { CreateBlockquoteRendererConfig, createBlockquoteRenderer } from './renderer';

export type BlockquoteForPluginConfig = Partial<
  Omit<CreateBlockquoteHandlersConfig & CreateBlockquoteRendererConfig, 'type' | 'controller'>
>;

export interface BlockquoteForToolHookConfig {
  action?: 'wrap' | 'unwrap' | 'toggle';
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
        ...createBlockquoteRenderer({ type, component })
      };
    },
    forToolHook(config) {
      const { action = 'toggle', activeNotProvided = false } = config || {};
      return editor => ({
        active: !activeNotProvided && controller.isSelectionIn(editor),
        onMouseDown: useCallback(() => controller[action](editor), [editor])
      });
    }
  };
}
