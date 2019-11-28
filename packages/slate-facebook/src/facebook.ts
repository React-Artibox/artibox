import { useCallback } from 'react';
import { Editor } from 'slate';
import { NodeType, InputData, ForPlugin, ForToolHook } from '@artibox/slate-common';
import { FACEBOOK_TYPE } from './constants';
import { FacebookController, createFacebookController } from './controller';
import { CreateFacebookRendererConfig, createFacebookRenderer } from './renderer';
import { createFacebookSchema } from './schema';

export type FacebookForPluginConfig = Omit<CreateFacebookRendererConfig, 'type'>;

export interface FacebookForToolHookConfig {
  setToolInput?: (editor: Editor, toolInput: InputData) => Editor | void;
}

export type Facebook = NodeType &
  FacebookController &
  ForPlugin<FacebookForPluginConfig> &
  ForToolHook<FacebookForToolHookConfig>;

export type CreateFacebookConfig = Partial<NodeType>;

export function createFacebook(config?: CreateFacebookConfig): Facebook {
  const { type = FACEBOOK_TYPE } = config || {};
  const controller = createFacebookController({ type });
  return {
    type,
    ...controller,
    forPlugin(config) {
      const { component } = config || {};
      return {
        ...createFacebookRenderer({ component }),
        schema: createFacebookSchema({ type })
      };
    },
    forToolHook(config) {
      const { setToolInput } = config || {};
      const toolInput: InputData = {
        getPlaceholder: locale => locale.editor.facebook.inputPlaceholder,
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
