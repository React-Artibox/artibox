import { Block, Editor } from 'slate';
import { NodeType } from '@artibox/slate-common';
import { PARAGRAPH_TYPE } from '@artibox/slate-common/constants/paragraph';
import { VideoSourceSerializeResult, serializeVideoSource } from './source-serializers';

export interface VideoController {
  createBlock({ provider, src }: VideoSourceSerializeResult): Block;
  add(editor: Editor, source: string): Editor;
}

export type CreateVideoControllerConfig = NodeType;

export function createVideoContrller(config: CreateVideoControllerConfig): VideoController {
  const { type } = config;
  const createBlock: VideoController['createBlock'] = ({ provider, src }) =>
    Block.fromJSON({ type, data: { provider, [provider]: src } });
  const add: VideoController['add'] = (editor, source) => {
    const result = serializeVideoSource(source);

    if (!result) {
      return editor;
    }

    return editor.insertBlock(createBlock(result)).insertBlock(PARAGRAPH_TYPE);
  };

  return { createBlock, add };
}
