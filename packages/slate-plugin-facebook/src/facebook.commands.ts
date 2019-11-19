import { Editor, Plugin } from 'slate';
import { PARAGRAPH_TYPE } from '@artibox/slate-core';
import { FACEBOOK_COMMAND_ADD } from './facebook.constants';
import { getFacebookEmbedDataFromHtmlCode, createFacebookBlock } from './facebook.utils';

export type FacebookCommandAdd = (editor: Editor, htmlCode: string) => Editor;

export type FacebookCommands = Plugin['commands'] & {
  [FACEBOOK_COMMAND_ADD]: FacebookCommandAdd;
};

export function FacebookCommands(type: string): FacebookCommands {
  return {
    [FACEBOOK_COMMAND_ADD](editor, htmlCode) {
      const embedData = getFacebookEmbedDataFromHtmlCode(htmlCode);

      if (!embedData || !embedData.type) {
        return editor;
      }

      return editor.insertBlock(createFacebookBlock(type, embedData)).insertBlock(PARAGRAPH_TYPE);
    }
  };
}
