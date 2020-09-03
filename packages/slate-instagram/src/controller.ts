import { Editor } from 'slate';
import { NodeType } from '@artibox/slate-common';
import { PARAGRAPH_TYPE } from '@artibox/slate-common/constants/paragraph';
import { getInstagramUrlFromEmbedCode } from './utils/get-instagram-url-from-embed-code';
import { createInstagramBlock } from './utils/create-instagram-block';

export interface InstagramController {
  /**
   * Insert the instagram block to editor.
   */
  insert(editor: Editor, embedCode: string): Editor;
}

export type CreateInstagramControllerConfig = NodeType;

export function createInstagramController(config: CreateInstagramControllerConfig): InstagramController {
  const { type } = config;
  const insert: InstagramController['insert'] = (editor, embedCode) => {
    const url = getInstagramUrlFromEmbedCode(embedCode);

    if (!url) {
      return editor;
    }

    return editor.insertBlock(createInstagramBlock(type, url)).insertBlock(PARAGRAPH_TYPE);
  };

  return { insert };
}
