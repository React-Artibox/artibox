import { useCallback } from 'react';
import { Editor } from 'slate';
import { HasNodeType, ToolInput, ToolHook } from '@artibox/slate-common';
import { FACEBOOK_TYPE } from './facebook.constants';
import { FacebookController } from './facebook.controller';
import { FacebookRendererConfig, FacebookRenderer } from './facebook.renderer';
import { FacebookSchema } from './facebook.schema';

export type FacebookCreateConfig = Partial<HasNodeType>;

export type FacebookForPluginConfig = Omit<FacebookRendererConfig, 'type'>;

export interface FacebookForToolHookConfig {
  setToolInput?: (editor: Editor, toolInput: ToolInput) => Editor | void;
}

export class Facebook extends FacebookController {
  static create(config?: FacebookCreateConfig) {
    const { type = FACEBOOK_TYPE } = config || {};
    return new this(type);
  }

  forPlugin(config?: FacebookForPluginConfig) {
    const { type } = this;
    const { component } = config || {};
    return {
      ...FacebookRenderer({ component }),
      schema: FacebookSchema({ type })
    } as const;
  }

  forToolHook(config: FacebookForToolHookConfig): ToolHook {
    const { setToolInput } = config;
    const toolInput: ToolInput = {
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
