import { Editor } from 'slate';
import { NodeType } from '@artibox/slate-common';
import { PARAGRAPH_TYPE } from '@artibox/slate-common/constants/paragraph';
import { serializeVideoSource } from './source-serializers';
import { createVideoBlock } from './utils/create-video-block';

export interface VideoController {
  /**
   * Insert the video block to editor.
   */
  insert(editor: Editor, source: string): Editor;
}

export type CreateVideoControllerConfig = NodeType;

export function createVideoContrller(config: CreateVideoControllerConfig): VideoController {
  const { type } = config;
  const insert: VideoController['insert'] = (editor, source) => {
    const result = serializeVideoSource(source);

    if (!result) {
      return editor;
    }

    return editor.insertBlock(createVideoBlock(type, result)).insertBlock(PARAGRAPH_TYPE);
  };

  return { insert };
}
