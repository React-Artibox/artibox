import { useCallback } from 'react';
import { Editor } from 'slate';
import { HasNodeType, ToolInput, ToolHook } from '@artibox/slate-common';
import { VIDEO_TYPE } from './video.constants';
import { VideoController } from './video.controller';
import { VideoRendererConfig, VideoRenderer } from './video.renderer';
import { VideoSchema } from './video.schema';

export type VideoCreateConfig = Partial<HasNodeType>;

export type VideoForPluginConfig = Omit<VideoRendererConfig, 'type'>;

export interface VideoForToolHookConfig {
  setToolInput?: (editor: Editor, toolInput: ToolInput) => Editor | void;
}

export class Video extends VideoController {
  static create(config?: VideoCreateConfig) {
    const { type = VIDEO_TYPE } = config || {};
    return new this(type);
  }

  forPlugin(config?: VideoForPluginConfig) {
    const { type } = this;
    const { component } = config || {};
    return {
      ...VideoRenderer({ type, component }),
      schema: VideoSchema({ type })
    } as const;
  }

  forToolHook(config: VideoForToolHookConfig): ToolHook {
    const { setToolInput } = config;
    const toolInput: ToolInput = {
      getPlaceholder: locale => locale.editor.video.inputPlaceholder,
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
