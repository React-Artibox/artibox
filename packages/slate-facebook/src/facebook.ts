import { useCallback } from 'react';
import { Editor } from 'slate';
import { NodeType, InputConfig, ForPlugin, ForToolHook } from '@artibox/slate-common';
import { FACEBOOK_TYPE } from './constants';
import { FacebookController, createFacebookController } from './controller';
import { CreateFacebookRendererConfig, createFacebookRenderer } from './renderer';
import { createFacebookSchema } from './schema';
import Facebook from './components/facebook';

export type FacebookForPluginConfig = Omit<CreateFacebookRendererConfig, 'type'>;

export interface FacebookForToolHookConfig {
  /**
   * The callback method override the origin setInputConfig provided by toolbar.
   */
  setInputConfig?: (editor: Editor, inputConfig: InputConfig) => Editor | void;
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
      const { component = Facebook } = config || {};
      return {
        ...createFacebookRenderer({ type, component }),
        schema: createFacebookSchema({ type })
      };
    },
    forToolHook(config) {
      const { setInputConfig } = config || {};
      const inputConfig: InputConfig = {
        getPlaceholder: locale => locale.editor.facebook.inputPlaceholder,
        onConfirm: controller.insert
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
