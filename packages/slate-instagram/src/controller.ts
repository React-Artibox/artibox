import { Block, Editor } from 'slate';
import { NodeType } from '@artibox/slate-common';
import { PARAGRAPH_TYPE } from '@artibox/slate-common/constants/paragraph';
import { getInstagramUrlFromEmbedCode } from './utils/get-instagram-url-from-embed-code';

export interface InstagramController {
  createBlock(url: string): Block;
  add(editor: Editor, embedCode: string): Editor;
}

export type CreateInstagramControllerConfig = NodeType;

export function createInstagramController(config: CreateInstagramControllerConfig): InstagramController {
  const { type } = config;
  const createBlock: InstagramController['createBlock'] = url => Block.fromJSON({ type, data: { url } });
  const add: InstagramController['add'] = (editor, embedCode) => {
    const url = getInstagramUrlFromEmbedCode(embedCode);

    if (!url) {
      return editor;
    }

    return editor.insertBlock(createBlock(url)).insertBlock(PARAGRAPH_TYPE);
  };

  return { createBlock, add };
}
