import { Block, Editor } from 'slate';
import { NodeType } from '@artibox/slate-common';
import { PARAGRAPH_TYPE } from '@artibox/slate-common/constants/paragraph';
import { FacebookEmbedData } from './types';
import { getFacebookEmbedDataFromHtml } from './utils/get-facebook-embed-data-from-html';

export interface FacebookController {
  createBlock(embedData: FacebookEmbedData): Block;
  add(editor: Editor, html: string): Editor;
}

export type CreateFacebookControllerConfig = NodeType;

export function createFacebookController(config: CreateFacebookControllerConfig): FacebookController {
  const { type } = config;

  const createBlock: FacebookController['createBlock'] = embedData => Block.fromJSON({ type, data: embedData });

  const add: FacebookController['add'] = (editor, html) => {
    const embedData = getFacebookEmbedDataFromHtml(html);

    if (!embedData || !embedData.type) {
      return editor;
    }

    return editor.insertBlock(createBlock(embedData)).insertBlock(PARAGRAPH_TYPE);
  };

  return { createBlock, add };
}
