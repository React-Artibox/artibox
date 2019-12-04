import { useCallback } from 'react';
import { NodeType, ForPlugin, ForToolHook } from '@artibox/slate-common';
import { CreateToggleMarkHandlersConfig, createToggleMarkHandlers } from './handlers';
import { CreateToggleMarkRendererConfig, createToggleMarkRenderer } from './renderer';
import { ToggleMarkController, createToggleMarkController } from './controller';

export type ToggleMarkDefaultConfig = Omit<CreateToggleMarkHandlersConfig, 'controller'> &
  CreateToggleMarkRendererConfig;

export type CreateToggleMarkConfig = Partial<NodeType>;

export type ToggleMarkForPluginConfig = Partial<
  Omit<CreateToggleMarkHandlersConfig & CreateToggleMarkRendererConfig, 'type' | 'controller'>
>;

export type ToggleMark = NodeType &
  ToggleMarkController &
  ForPlugin<ToggleMarkForPluginConfig> &
  ForToolHook<undefined>;

export function createToggleMarkCreator(defaults: ToggleMarkDefaultConfig) {
  function createToggleMark(config?: CreateToggleMarkConfig): ToggleMark {
    const { type = defaults.type } = config || {};
    const controller = createToggleMarkController({ type });
    return {
      type,
      ...controller,
      forPlugin(config) {
        const { hotkey = defaults.hotkey, component = defaults.component } = config || {};
        return {
          ...createToggleMarkHandlers({ hotkey, controller }),
          ...createToggleMarkRenderer({ type, component })
        };
      },
      forToolHook: () => editor => ({
        active: controller.isSelectionIn(editor),
        /**
         * Toggle the mark while tool clicked.
         */
        onMouseDown: useCallback(() => controller.toggle(editor), [editor])
      })
    };
  }

  return createToggleMark;
}
