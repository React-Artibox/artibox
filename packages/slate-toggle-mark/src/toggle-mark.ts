import { useCallback } from 'react';
import { HasNodeType, ToolHook } from '@artibox/slate-common';
import { ToggleMarkHandlersDefaultConfig, ToggleMarkHandlersConfig, ToggleMarkHandlers } from './toggle-mark.handlers';
import { ToggleMarkRendererDefaultConfig, ToggleMarkRendererConfig, ToggleMarkRenderer } from './toggle-mark.renderer';
import { ToggleMarkController } from './toggle-mark.controller';
import { createToggleMarkHandlers } from './toggle-mark.handlers';
import { createToggleMarkRenderer } from './toggle-mark.renderer';

export type ToggleMarkDefaultConfig = ToggleMarkHandlersDefaultConfig & ToggleMarkRendererDefaultConfig;

export type ToggleMarkCreateConfig = Partial<HasNodeType>;

export type ToggleMarkForPluginConfig = Partial<
  Omit<ToggleMarkHandlersConfig & ToggleMarkRendererConfig, 'type' | 'controller'>
>;

export interface ToggleMark extends ToggleMarkController {
  forPlugin(config?: ToggleMarkForPluginConfig): ToggleMarkHandlers & ToggleMarkRenderer;
  forToolHook(): ToolHook;
}

export interface ToggleMarkFactory {
  new (type: string): ToggleMark;
  create(config?: ToggleMarkCreateConfig): ToggleMark;
}

export function createToggleMark(defaults: ToggleMarkDefaultConfig) {
  const Handlers = createToggleMarkHandlers(defaults);
  const Renderer = createToggleMarkRenderer(defaults);

  class Core extends ToggleMarkController implements ToggleMark {
    static create(config?: ToggleMarkCreateConfig) {
      const { type = defaults.type } = config || {};
      return new this(type);
    }

    forPlugin(config?: ToggleMarkForPluginConfig) {
      const { type } = this;
      const { hotkey, component } = config || {};
      return {
        ...Handlers({ hotkey, controller: this }),
        ...Renderer({ type, component })
      };
    }

    forToolHook(): ToolHook {
      return editor => ({
        active: this.isSelectionIn(editor),
        onMouseDown: useCallback(() => this.toggle(editor), [editor])
      });
    }
  }

  return {
    Core: Core as ToggleMarkFactory,
    Handlers,
    Renderer
  };
}
