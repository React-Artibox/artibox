import { useCallback } from 'react';
import { Editor } from 'slate';
import { HasNodeType, ToolInput, ToolHook } from '@artibox/slate-common';
import { INSTAGRAM_TYPE } from './instagram.constants';
import { InstagramController } from './instagram.controller';
import { InstagramRendererConfig, InstagramRenderer } from './instagram.renderer';
import { InstagramSchema } from './instagram.schema';

export type InstagramCreateConfig = Partial<HasNodeType>;

export type InstagramForPluginConfig = Omit<InstagramRendererConfig, 'type'>;

export interface InstagramForToolHookConfig {
  setToolInput?: (editor: Editor, toolInput: ToolInput) => Editor | void;
}

export class Instagram extends InstagramController {
  static create(config?: InstagramCreateConfig) {
    const { type = INSTAGRAM_TYPE } = config || {};
    return new this(type);
  }

  forPlugin(config?: InstagramForPluginConfig) {
    const { type } = this;
    const { component } = config || {};
    return {
      ...InstagramRenderer({ type, component }),
      schema: InstagramSchema({ type })
    } as const;
  }

  forToolHook(config: InstagramForToolHookConfig): ToolHook {
    const { setToolInput } = config;
    const toolInput: ToolInput = {
      getPlaceholder: locale => locale.editor.instagram.inputPlaceholder,
      onConfirm: this.add
    };

    return (editor, defaultSetToolInput) => ({
      onMouseDown: useCallback(() => {
        if (setToolInput) {
          setToolInput(editor, toolInput);
        } else {
          defaultSetToolInput(toolInput);
        }
      }, [editor, defaultSetToolInput])
    });
  }
}
