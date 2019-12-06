import { useCallback } from 'react';
import { NodeType, ToolHook, ForPlugin, ForToolHook } from '@artibox/slate-common';
import { HEADING_TYPE, HEADING_HOTKEY, HEADING_LEVELS } from './constants';
import { HeadingLevel } from './typings';
import { CreateHeadingHandlersConfig, createHeadingHandlers } from './handlers';
import { HeadingController, createHeadingController } from './controller';
import { CreateHeadingRendererConfig, createHeadingRenderer } from './renderer';
import { CreateHeadingSchemaConfig, createHeadingSchema } from './schema';

export interface HeadingForPluginConfig
  extends Partial<
    Omit<
      CreateHeadingHandlersConfig & CreateHeadingRendererConfig & CreateHeadingSchemaConfig,
      'type' | 'controller' | 'enabled'
    >
  > {
  /**
   * The blacklist of heading levels.
   */
  disabled?: HeadingLevel[];
}

export interface HeadingForToolHookConfig {
  level: HeadingLevel;
}

export type Heading = NodeType &
  HeadingController &
  ForPlugin<HeadingForPluginConfig> &
  ForToolHook<HeadingForToolHookConfig>;

export type CreateHeadingonfig = Partial<NodeType>;

export function createHeading(config?: CreateHeadingonfig): Heading {
  const { type = HEADING_TYPE } = config || {};
  const controller = createHeadingController({ type });
  return {
    type,
    ...controller,
    forPlugin(config?: HeadingForPluginConfig) {
      const { disabled = [], hotkey = HEADING_HOTKEY } = config || {};
      const enabled = HEADING_LEVELS.filter(level => !disabled.includes(level));

      return {
        ...createHeadingHandlers({ enabled, hotkey, controller }),
        ...createHeadingRenderer({ type }),
        schema: createHeadingSchema({ type, enabled })
      };
    },
    forToolHook(config: HeadingForToolHookConfig): ToolHook {
      const { level } = config;
      return editor => ({
        active: controller.isSelectionIn(editor, level),
        onClick: useCallback(() => controller.toggle(editor, level), [editor])
      });
    }
  };
}
