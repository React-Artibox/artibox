import { Block, Editor } from 'slate';
import { NodeType } from '@artibox/slate-common';
import { PARAGRAPH_TYPE } from '@artibox/slate-common/constants/paragraph';
import { WithHostingResolvers, WithThresholds } from './typings';
import { getImageSrcFromBlock } from './utils/get-image-src-from-block';

export interface ImageController {
  /**
   * Check if the block is image.
   */
  isBlockAs(block?: Block | null): block is Block;
  /**
   * Check if there are some images in the current selection.
   */
  isSelectionIn(editor: Editor): boolean;
  /**
   * Get the first image in the current selection.
   */
  getCurrent(editor: Editor): Block | null;
  /**
   * Get src of the first image in the current selection.
   */
  getSrcOfCurrent(editor: Editor): string | undefined;
  /**
   * Create an image block.
   */
  createBlock(src: string, hostingType?: string): Block;
  /**
   * Add an image.
   */
  add(editor: Editor, src: string, hostingType?: string): Editor;
  /**
   * Resize the specific image.
   */
  resize(editor: Editor, image: Block, width: number): Editor;
}

export type CreateImageControllerConfig = NodeType & Partial<WithHostingResolvers & WithThresholds>;

export function createImageController(config: CreateImageControllerConfig): ImageController {
  const { type, hostingResolvers, thresholds } = config || {};
  const isBlockAs: ImageController['isBlockAs'] = (block): block is Block => block?.type === type;
  const isSelectionIn: ImageController['isSelectionIn'] = editor => editor.value.blocks.some(isBlockAs);
  const getCurrent: ImageController['getCurrent'] = editor => {
    const image = editor.value.startBlock;
    return isBlockAs(image) ? image : null;
  };
  const getSrcOfCurrent: ImageController['getSrcOfCurrent'] = editor => {
    const image = getCurrent(editor);
    return image ? getImageSrcFromBlock(image, hostingResolvers) : undefined;
  };
  const createBlock: ImageController['createBlock'] = (src, hostingType) =>
    Block.create({
      type,
      data: { src, hostingType, width: 100 },
      nodes: []
    });
  const add: ImageController['add'] = (editor, src, hostingType) =>
    editor.insertBlock(createBlock(src, hostingType)).insertBlock(PARAGRAPH_TYPE).moveToStartOfBlock();
  const resize: ImageController['resize'] = (editor, image, width) => {
    if (!isBlockAs(image) || (thresholds && !thresholds.includes(width))) {
      return editor;
    }

    return editor.setNodeByKey(image.key, image.setIn(['data', 'width'], width) as Block);
  };

  return {
    isBlockAs,
    isSelectionIn,
    getCurrent,
    getSrcOfCurrent,
    createBlock,
    add,
    resize
  };
}
