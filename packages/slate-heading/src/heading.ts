import { useCallback } from 'react';
import { HasNodeType, ToolHook } from '@artibox/slate-common';
import { HEADING_TYPE, HEADING_HOTKEY, HEADING_LEVELS } from './heading.constants';
import { HeadingLevel } from './heading.types';
import { HeadingHandlersConfig, HeadingHandlers } from './heading.handlers';
import { HeadingController } from './heading.controller';
import { HeadingRendererConfig, HeadingRenderer } from './heading.renderer';
import { HeadingSchemaConfig, HeadingSchema } from './heading.schema';

export type HeadingCreateConfig = Partial<HasNodeType>;

export interface HeadingForPluginConfig
  extends Partial<
    Omit<HeadingHandlersConfig & HeadingRendererConfig & HeadingSchemaConfig, 'type' | 'controller' | 'enabled'>
  > {
  disabled?: HeadingLevel[];
}

export interface HeadingForToolHookConfig {
  level: HeadingLevel;
}

export class Heading extends HeadingController {
  static create(config?: HeadingCreateConfig) {
    const { type = HEADING_TYPE } = config || {};
    return new this(type);
  }

  forPlugin(config?: HeadingForPluginConfig) {
    const { type } = this;
    const { disabled = [], hotkey = HEADING_HOTKEY } = config || {};
    const enabled = HEADING_LEVELS.filter(level => !disabled.includes(level));

    return {
      ...HeadingHandlers({ enabled, hotkey, controller: this }),
      ...HeadingRenderer({ type }),
      schema: HeadingSchema({ type, enabled })
    };
  }

  forToolHook(config: HeadingForToolHookConfig): ToolHook {
    const { level } = config;
    return editor => ({
      active: this.isSelectionIn(editor, level),
      onMouseDown: useCallback(() => this.toggle(editor, level), [editor])
    });
  }
}
