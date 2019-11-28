import { useCallback } from 'react';
import { NodeType, ForPlugin, ForToolHook } from '@artibox/slate-common';
import {
  CreateToggleMarkHandlersCreatorDefaultConfig,
  CreateToggleMarkHandlersCreatorConfig,
  createToggleMarkHandlersCreator
} from './handlers';
import {
  CreateToggleMarkRendererCreatorDefaultConfig,
  CreateToggleMarkRendererCreatorConfig,
  createToggleMarkRendererCreator
} from './renderer';
import { ToggleMarkController, createToggleMarkController } from './controller';

export type ToggleMarkDefaultConfig = CreateToggleMarkHandlersCreatorDefaultConfig &
  CreateToggleMarkRendererCreatorDefaultConfig;

export type CreateToggleMarkConfig = Partial<NodeType>;

export type ToggleMarkForPluginConfig = Partial<
  Omit<CreateToggleMarkHandlersCreatorConfig & CreateToggleMarkRendererCreatorConfig, 'type' | 'controller'>
>;

export type ToggleMark = NodeType &
  ToggleMarkController &
  ForPlugin<ToggleMarkForPluginConfig> &
  ForToolHook<undefined>;

export function createToggleMarkCreator(defaults: ToggleMarkDefaultConfig) {
  const createHandlers = createToggleMarkHandlersCreator(defaults);
  const createRenderer = createToggleMarkRendererCreator(defaults);

  function createToggleMark(config?: CreateToggleMarkConfig): ToggleMark {
    const { type = defaults.type } = config || {};
    const controller = createToggleMarkController({ type });
    return {
      type,
      ...controller,
      forPlugin(config) {
        const { hotkey, component } = config || {};
        return {
          ...createHandlers({ hotkey, controller }),
          ...createRenderer({ type, component })
        };
      },
      forToolHook: () => editor => ({
        active: controller.isSelectionIn(editor),
        onMouseDown: useCallback(() => controller.toggle(editor), [editor])
      })
    };
  }

  return createToggleMark;
}
