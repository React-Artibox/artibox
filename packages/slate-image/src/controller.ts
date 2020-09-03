import { Block, Editor, Range } from 'slate';
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
   * Insert an image.
   */
  insert(
    editor: Editor,
    src: string,
    options?: {
      hostingType?: string;
      range?: Range | null;
    }
  ): Editor;
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
  const insert: ImageController['insert'] = (editor, src, options) => {
    const { hostingType, range } = options || {};
    const imageBlock = createBlock(src, hostingType);

    if (range) {
      editor.insertBlockAtRange(range, imageBlock);
    } else {
      editor.insertBlock(imageBlock);
    }

    return editor.insertBlock(PARAGRAPH_TYPE).moveToStartOfBlock();
  };
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
    insert,
    resize
  };
}
