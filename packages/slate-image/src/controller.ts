import { Node, Block, Editor, Range } from 'slate';
import { PARAGRAPH_TYPE } from '@artibox/slate-common/constants/paragraph';
import { WithThresholds, ImageTypes } from './typings';

export interface ImageController {
  /**
   * Check if the block is image.
   */
  isNodeAsImage(node?: Node | null): node is Block;
  /**
   * Check if the block is image caption.
   */
  isNodeAsCaption(node?: Node | null): node is Block;
  /**
   * Check if there are some images in the current selection.
   */
  isSelectionInImage(editor: Editor): boolean;
  /**
   * Check if there are some image captions in the current selection.
   */
  isSelectionInCaption(editor: Editor): boolean;
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

export interface CreateImageControllerConfig extends Partial<WithThresholds> {
  types: ImageTypes;
}

export function createImageController(config: CreateImageControllerConfig): ImageController {
  const { types, thresholds } = config || {};
  const createIsNodeAs = (type: string) => (node?: Node | null): node is Block => {
    if (!node) {
      return false;
    }

    return node.object === 'block' && node.type === type;
  };
  const createIsSelectionIn = (is: typeof isNodeAsImage | typeof isNodeAsCaption) => (editor: Editor) =>
    editor.value.blocks.some(is);
  const isNodeAsImage: ImageController['isNodeAsImage'] = createIsNodeAs(types.image);
  const isNodeAsCaption: ImageController['isNodeAsCaption'] = createIsNodeAs(types.caption);
  const isSelectionInImage: ImageController['isSelectionInImage'] = createIsSelectionIn(isNodeAsImage);
  const isSelectionInCaption: ImageController['isSelectionInCaption'] = createIsSelectionIn(isNodeAsCaption);
  const createBlock: ImageController['createBlock'] = (src, hostingType) =>
    Block.create({
      type: types.figure,
      nodes: [
        Block.create({
          type: types.image,
          data: { src, hostingType, width: 100 },
          nodes: []
        }),
        Block.create({
          type: types.caption,
          text: ''
        })
      ]
    });
  const insert: ImageController['insert'] = (editor, src, options) => {
    const { hostingType, range } = options || {};
    const imageBlock = createBlock(src, hostingType);
    /**
     * Since insert paragraph after inserting file uploader block will cause paragraph inserted into file uploader block.
     * The workaround insert a placeholder and paragraph first and then replace the placeholder w/ file uploader block.
     */
    const placeholder = Block.create(PARAGRAPH_TYPE);

    if (range) {
      editor.insertBlockAtRange(range, placeholder);
    } else {
      editor.insertBlock(placeholder);
    }

    /**
     * Calling `moveToStartOfPreviousBlock` one time will just move to caption not image.
     */
    return editor
      .insertBlock(PARAGRAPH_TYPE)
      .replaceNodeByKey(placeholder.key, imageBlock)
      .moveToStartOfPreviousBlock()
      .moveToStartOfPreviousBlock();
  };
  const resize: ImageController['resize'] = (editor, node, width) => {
    if (!isNodeAsImage(node) || (thresholds && !thresholds.includes(width))) {
      return editor;
    }

    return editor.setNodeByKey(node.key, node.setIn(['data', 'width'], width) as Block);
  };

  return {
    isNodeAsImage,
    isNodeAsCaption,
    isSelectionInImage,
    isSelectionInCaption,
    createBlock,
    insert,
    resize
  };
}
