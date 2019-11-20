import { Block, Editor } from 'slate';
import { PARAGRAPH_TYPE } from '@artibox/slate-core';
import { INSTAGRAM_DATA_KEY_URL } from './instagram.constants';

export interface InstagramUtils {
  getInstagramUrlFromEmbedCode(embedCode: string): string | undefined;
  createInstagramBlock(url: string): Block;
  addInstagramBlock(editor: Editor, embedCode: string): Editor;
}

export function InstagramUtils(type: string): InstagramUtils {
  const getInstagramUrlFromEmbedCode: InstagramUtils['getInstagramUrlFromEmbedCode'] = embedCode => {
    const template = document.createElement('template');
    template.innerHTML = embedCode;
    const { firstChild } = template.content;

    if (!firstChild || firstChild.nodeName !== 'BLOCKQUOTE') {
      return undefined;
    }

    const blockquote = firstChild as HTMLElement;
    const link = (blockquote.firstChild as HTMLDivElement).children[0] as HTMLLinkElement | null | undefined;

    if (!link) {
      return undefined;
    }

    const href = link.getAttribute('href');

    if (!href) {
      return undefined;
    }

    return href.replace(/^https:\/\/www\.instagram\.com\//, '').replace(/\/$/, '');
  };
  const createInstagramBlock: InstagramUtils['createInstagramBlock'] = url =>
    Block.fromJSON({
      type,
      data: { [INSTAGRAM_DATA_KEY_URL]: url }
    });
  const addInstagramBlock: InstagramUtils['addInstagramBlock'] = (editor, embedCode) => {
    const url = getInstagramUrlFromEmbedCode(embedCode);

    if (!url) {
      return editor;
    }

    return editor.insertBlock(createInstagramBlock(url)).insertBlock(PARAGRAPH_TYPE);
  };

  return {
    getInstagramUrlFromEmbedCode,
    createInstagramBlock,
    addInstagramBlock
  };
}
