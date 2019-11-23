import { Block, Editor } from 'slate';
import { HasNodeType, PARAGRAPH_TYPE } from '@artibox/slate-common';
import { FacebookEmbedData } from './facebook.interfaces';
import { getFacebookEmbedDataFromHtmlCode } from './facebook.utils';

export abstract class FacebookController implements HasNodeType {
  constructor(public readonly type: string) {}

  createBlock = (embedData: FacebookEmbedData): Block => Block.fromJSON({ type: this.type, data: embedData });

  add = (editor: Editor, htmlCode: string): Editor => {
    const embedData = getFacebookEmbedDataFromHtmlCode(htmlCode);

    if (!embedData || !embedData.type) {
      return editor;
    }

    return editor.insertBlock(this.createBlock(embedData)).insertBlock(PARAGRAPH_TYPE);
  };
}
