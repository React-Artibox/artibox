import { Editor } from 'slate';
import { NodeType } from '@artibox/slate-common';
import { PARAGRAPH_TYPE } from '@artibox/slate-common/constants/paragraph';
import { getFacebookEmbedDataFromHtml } from './utils/get-facebook-embed-data-from-html';
import { createFacebookBlock } from './utils/create-facebook-block';

export interface FacebookController {
  /**
   * Add the facebook block to editor.
   */
  add(editor: Editor, html: string): Editor;
}

export type CreateFacebookControllerConfig = NodeType;

export function createFacebookController(config: CreateFacebookControllerConfig): FacebookController {
  const { type } = config;

  const add: FacebookController['add'] = (editor, html) => {
    const embedData = getFacebookEmbedDataFromHtml(html);

    if (!embedData || !embedData.type) {
      return editor;
    }

    return editor.insertBlock(createFacebookBlock(type, embedData)).insertBlock(PARAGRAPH_TYPE);
  };

  return { add };
}
