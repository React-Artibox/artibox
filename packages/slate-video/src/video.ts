import { useCallback } from 'react';
import { Editor } from 'slate';
import { NodeType, InputData, ForPlugin, ForToolHook } from '@artibox/slate-common';
import { VIDEO_TYPE } from './constants';
import { VideoController, createVideoContrller } from './controller';
import { CreateVideoRendererConfig, createVideoRenderer } from './renderer';
import { createVideoSchema } from './schema';

export type CreateVideoConfig = Partial<NodeType>;

export type VideoForPluginConfig = Omit<CreateVideoRendererConfig, 'type'>;

export interface VideoForToolHookConfig {
  setToolInput?: (editor: Editor, toolInput: InputData) => Editor | void;
}

export type Video = NodeType & VideoController & ForPlugin<VideoForPluginConfig> & ForToolHook<VideoForToolHookConfig>;

export function createVideo(config?: CreateVideoConfig): Video {
  const { type = VIDEO_TYPE } = config || {};
  const contrller = createVideoContrller({ type });
  return {
    type,
    ...contrller,
    forPlugin(config) {
      const { component } = config || {};
      return {
        ...createVideoRenderer({ type, component }),
        schema: createVideoSchema({ type })
      };
    },
    forToolHook(config) {
      const { setToolInput } = config || {};
      const toolInput: InputData = {
        getPlaceholder: locale => locale.editor.video.inputPlaceholder,
        onConfirm: contrller.add
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
