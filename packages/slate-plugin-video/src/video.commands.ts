import { Editor, Plugin } from 'slate';
import { PARAGRAPH_TYPE } from '@artibox/slate-core';
import { VIDEO_COMMAND_ADD } from './video.constants';
import { serializeVideoSource } from './video.serializers';
import { createVideoBlock } from './video.utils';

/**
 * To add the video block and add one paragraph block below it.
 */
export type VideoCommandAdd = (editor: Editor, source: string) => Editor;

export type VideoCommands = Plugin['commands'] & {
  [VIDEO_COMMAND_ADD]: VideoCommandAdd;
};

export function VideoCommands(type: string): VideoCommands {
  return {
    [VIDEO_COMMAND_ADD]: (editor, source) => {
      const result = serializeVideoSource(source);

      if (!result) {
        return editor;
      }

      return editor.insertBlock(createVideoBlock(type, result)).insertBlock(PARAGRAPH_TYPE);
    }
  };
}
