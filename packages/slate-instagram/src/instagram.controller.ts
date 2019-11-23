import { Block, Editor } from 'slate';
import { HasNodeType, PARAGRAPH_TYPE } from '@artibox/slate-common';
import { INSTAGRAM_DATA_KEY_URL } from './instagram.constants';
import { getInstagramUrlFromEmbedCode } from './instagram.utils';

export abstract class InstagramController implements HasNodeType {
  constructor(public readonly type: string) {}

  createBlock = (url: string): Block =>
    Block.fromJSON({
      type: this.type,
      data: { [INSTAGRAM_DATA_KEY_URL]: url }
    });

  add = (editor: Editor, embedCode: string): Editor => {
    const url = getInstagramUrlFromEmbedCode(embedCode);

    if (!url) {
      return editor;
    }

    return editor.insertBlock(this.createBlock(url)).insertBlock(PARAGRAPH_TYPE);
  };
}
