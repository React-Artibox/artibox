import { useCallback } from 'react';
import { Editor } from 'slate';
import { NodeType, InputData, ToolHook, ForPlugin, ForToolHook } from '@artibox/slate-common';
import { INSTAGRAM_TYPE } from './constants';
import { InstagramController, createInstagramController } from './controller';
import { CreateInstagramRendererConfig, createInstagramRenderer } from './renderer';
import { createInstagramSchema } from './schema';

export type InstagramForPluginConfig = Omit<CreateInstagramRendererConfig, 'type'>;

export interface InstagramForToolHookConfig {
  setToolInput?: (editor: Editor, toolInput: InputData) => Editor | void;
}

export type Instagram = NodeType &
  InstagramController &
  ForPlugin<InstagramForPluginConfig> &
  ForToolHook<InstagramForToolHookConfig>;

export type CreateInstagramConfig = Partial<NodeType>;

export function createInstagram(config?: CreateInstagramConfig): Instagram {
  const { type = INSTAGRAM_TYPE } = config || {};
  const controller = createInstagramController({ type });
  return {
    type,
    ...controller,
    forPlugin(config?: InstagramForPluginConfig) {
      const { component } = config || {};
      return {
        ...createInstagramRenderer({ type, component }),
        schema: createInstagramSchema({ type })
      };
    },
    forToolHook(config: InstagramForToolHookConfig): ToolHook {
      const { setToolInput } = config;
      const toolInput: InputData = {
        getPlaceholder: locale => locale.editor.instagram.inputPlaceholder,
        onConfirm: controller.add
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
  };
}
