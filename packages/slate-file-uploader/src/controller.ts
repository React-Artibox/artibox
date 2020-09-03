import { Editor, Block, Inline } from 'slate';
import { NodeType } from '@artibox/slate-common';

export interface FileUploaderController {
  /**
   * Check if the block is file uploader placeholder.
   */
  isBlockAs(block?: Block | null): block is Block;
  /**
   * Insert a file uploader placeholder block.
   */
  insert(editor: Editor, uploadingBlockOrInline: Block | Inline): Block;
  /**
   * Set uploading percentage of the file uploader placeholder block.
   */
  setPercentage(editor: Editor, block: Block, percentage: number): void;
}

export type CreateFileUploaderControllerConfig = NodeType;

export function createFileUploaderController(config: CreateFileUploaderControllerConfig): FileUploaderController {
  const { type } = config;
  const isBlockAs: FileUploaderController['isBlockAs'] = (block): block is Block => block?.type === type;
  const insert: FileUploaderController['insert'] = (editor, uploadingBlockOrInline) => {
    const block = Block.create({ type, data: { percentage: 0 }, nodes: [uploadingBlockOrInline] });
    editor.insertBlock(block);
    return block;
  };
  const setPercentage: FileUploaderController['setPercentage'] = (editor, block, percentage) => {
    if (!isBlockAs(block)) {
      return;
    }

    editor.setNodeByKey(block.key, block.setIn(['data', 'percentage'], percentage) as Block);
  };

  return {
    isBlockAs,
    insert,
    setPercentage
  };
}
