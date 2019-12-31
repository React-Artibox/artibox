import { Inline, Editor } from 'slate';
import { NodeType } from '@artibox/slate-common';
import { WithHostingResolvers, WithThresholds } from './typings';
import { getImageSrcFromInline } from './utils/get-image-src-from-inline';
import { createImageInline } from './utils/create-image-inline';

export interface ImageController {
  /**
   * Check if the inline is image.
   */
  isInlineAs(inline?: Inline | null): boolean;
  /**
   * Check if there are some images in the current selection.
   */
  isSelectionIn(editor: Editor): boolean;
  /**
   * Get the first image in the current selection.
   */
  getCurrent(editor: Editor): Inline | null;
  /**
   * Get url of the first image in the current selection.
   */
  getSrcOfCurrent(editor: Editor): string | undefined;
  /**
   * Add an image.
   */
  add(editor: Editor, src: string, hostingType?: string): Editor;
  /**
   * Resize the first image in the current selection.
   */
  resize(editor: Editor, width: number): Editor;
}

export type CreateImageControllerConfig = NodeType & Partial<WithHostingResolvers & WithThresholds>;

export function createImageController(config: CreateImageControllerConfig): ImageController {
  const { type, hostingResolvers, thresholds } = config || {};
  const isInlineAs: ImageController['isInlineAs'] = inline => inline?.type === type;
  const isSelectionIn: ImageController['isSelectionIn'] = editor => editor.value.inlines.some(isInlineAs);
  const getCurrent: ImageController['getCurrent'] = editor => editor.value.startInline;
  const getSrcOfCurrent: ImageController['getSrcOfCurrent'] = editor => {
    const image = getCurrent(editor);
    return image ? getImageSrcFromInline(image, hostingResolvers) : undefined;
  };
  const add: ImageController['add'] = (editor, src, hostingType) =>
    editor.insertInline(createImageInline(type, src, hostingType, 100));
  const resize: ImageController['resize'] = (editor, width) => {
    const image = getCurrent(editor);

    if (!image || (thresholds && !thresholds.includes(width))) {
      return editor;
    }

    return editor.setInlines(image.setIn(['data', 'width'], width) as Inline);
  };

  return {
    isInlineAs,
    isSelectionIn,
    getCurrent,
    getSrcOfCurrent,
    add,
    resize
  };
}
