import { Editor, Plugin } from 'slate';
import { PARAGRAPH_TYPE } from '@artibox/slate-core';
import { VIDEO_COMMAND_ADD, VIDEO_PROVIDERS } from './video.constants';
import { createVideoBlock } from './video.utils';

/**
 * To add the video block and add one paragraph block below it.
 */
export type VideoCommandAdd = (editor: Editor, source: string, provider: VIDEO_PROVIDERS) => Editor;

export type VideoCommands = Plugin['commands'] & {
  [VIDEO_COMMAND_ADD]: VideoCommandAdd;
};

export function VideoCommands(type: string): VideoCommands {
  return {
    [VIDEO_COMMAND_ADD]: (editor, source, provider) => {
      return editor.insertBlock(createVideoBlock(type, source, provider)).insertBlock(PARAGRAPH_TYPE);
    }
  };
}
