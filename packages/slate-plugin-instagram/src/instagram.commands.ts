import { Editor, Plugin } from 'slate';
import { PARAGRAPH_TYPE } from '@artibox/slate-core';
import { INSTAGRAM_COMMAND_ADD } from './instagram.constants';
import { getInstagramUrlFromEmbedCode, createInstagramBlock } from './instagram.utils';

export type InstagramCommandAdd = (editor: Editor, embedCode: string) => Editor;

export type InstagramCommands = Plugin['commands'] & {
  [INSTAGRAM_COMMAND_ADD]: InstagramCommandAdd;
};

export function InstagramCommands(type: string): InstagramCommands {
  return {
    [INSTAGRAM_COMMAND_ADD](editor, embedCode) {
      const url = getInstagramUrlFromEmbedCode(embedCode);

      if (!url) {
        return editor;
      }

      return editor.insertBlock(createInstagramBlock(type, url)).insertBlock(PARAGRAPH_TYPE);
    }
  };
}
