import { Block, Editor } from 'slate';
import { HasNodeType } from '@artibox/slate-common';
import { PARAGRAPH_TYPE } from '@artibox/slate-common/constants/paragraph.constants';
import { VIDEO_DATA_KEY_PROVIDER } from './video.constants';
import { VideoSerializeResult, serializeVideoSource } from './video.serializers';

export class VideoController implements HasNodeType {
  constructor(public readonly type: string) {}

  createBlock = ({ provider, src }: VideoSerializeResult): Block =>
    Block.fromJSON({
      type: this.type,
      data: {
        [VIDEO_DATA_KEY_PROVIDER]: provider,
        [provider]: src
      }
    });

  add = (editor: Editor, source: string): Editor => {
    const result = serializeVideoSource(source);

    if (!result) {
      return editor;
    }

    return editor.insertBlock(this.createBlock(result)).insertBlock(PARAGRAPH_TYPE);
  };
}
