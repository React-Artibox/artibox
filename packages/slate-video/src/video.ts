import { useCallback } from 'react';
import { Editor } from 'slate';
import { NodeType, InputConfig, ForPlugin, ForToolHook } from '@artibox/slate-common';
import { VIDEO_TYPE } from './constants';
import { VideoController, createVideoContrller } from './controller';
import { CreateVideoRendererConfig, createVideoRenderer } from './renderer';
import { createVideoSchema } from './schema';
import VideoComponent from './components/video';

export type CreateVideoConfig = Partial<NodeType>;

export type VideoForPluginConfig = Omit<CreateVideoRendererConfig, 'type'>;

export interface VideoForToolHookConfig {
  /**
   * The callback method override the origin setInputConfig provided by toolbar.
   */
  setInputConfig?: (editor: Editor, inputConfig: InputConfig) => Editor | void;
}

export type Video = NodeType & VideoController & ForPlugin<VideoForPluginConfig> & ForToolHook<VideoForToolHookConfig>;

export function createVideo(config?: CreateVideoConfig): Video {
  const { type = VIDEO_TYPE } = config || {};
  const contrller = createVideoContrller({ type });
  return {
    type,
    ...contrller,
    forPlugin(config) {
      const { component = VideoComponent } = config || {};
      return {
        ...createVideoRenderer({ type, component }),
        schema: createVideoSchema({ type })
      };
    },
    forToolHook(config) {
      const { setInputConfig } = config || {};
      const inputConfig: InputConfig = {
        getPlaceholder: locale => locale.editor.video.inputPlaceholder,
        onConfirm: contrller.add
      };

      return (editor, defaultSetInputConfig) => ({
        onMouseDown: useCallback(() => {
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
