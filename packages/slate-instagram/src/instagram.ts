import { useCallback } from 'react';
import { Editor } from 'slate';
import { NodeType, InputConfig, ToolHook, ForPlugin, ForToolHook } from '@artibox/slate-common';
import { INSTAGRAM_TYPE } from './constants';
import { InstagramController, createInstagramController } from './controller';
import { CreateInstagramRendererConfig, createInstagramRenderer } from './renderer';
import { createInstagramSchema } from './schema';
import Instagram from './components/instagram';

export type InstagramForPluginConfig = Omit<CreateInstagramRendererConfig, 'type'>;

export interface InstagramForToolHookConfig {
  /**
   * The callback method override the origin setInputConfig provided by toolbar.
   */
  setInputConfig?: (editor: Editor, inputConfig: InputConfig) => Editor | void;
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
      const { component = Instagram } = config || {};
      return {
        ...createInstagramRenderer({ type, component }),
        schema: createInstagramSchema({ type })
      };
    },
    forToolHook(config): ToolHook {
      const { setInputConfig } = config || {};
      const inputConfig: InputConfig = {
        getPlaceholder: locale => locale.editor.instagram.inputPlaceholder,
        onConfirm: controller.add
      };

      return (editor, defaultSetInputConfig) => ({
        onClick: useCallback(() => {
          if (setInputConfig) {
            setInputConfig(editor, inputConfig);
          } else {
            defaultSetInputConfig(inputConfig);
          }
        }, [editor, defaultSetInputConfig])
      });
    }
  };
}
