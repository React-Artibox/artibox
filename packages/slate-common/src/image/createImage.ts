import { Editor, Element, Range, Transforms } from 'slate';
import { isImageUrl as defaultIsImageUrl } from '@artibox/utils/isImageUrl';
import { isNodesTypeIn, IsNodesTypeInOptions } from '../queries/isNodesTypeIn';
import { getAboveByTypes, GetAboveByTypesOptions } from '../queries/getAboveByTypes';
import { normalizeVoidElementChildren } from '../normalizers/normalizeVoidElementChildren';
import { normalizeOnlyInlineOrTextInChildren } from '../normalizers/normalizeOnlyInlineOrTextInChildren';
import { Paragraph } from '../paragraph';
import {
  ImageCaptionElement,
  ImageElement,
  ImageFigureElement,
  ImageSizeSteps,
  ImageTypes,
  IMAGE_TYPES
} from './common';
import { Image } from './typings';

function resolveSizeSteps(steps: ImageSizeSteps): ImageSizeSteps {
  let sortedSteps = steps.filter(step => step > 0 && step < 100).sort();

  if (!sortedSteps.includes(100)) {
    sortedSteps = [...sortedSteps, 100];
  }

  return sortedSteps;
}

export interface CreateImageOptions<Hosting extends string>
  extends Partial<Pick<Image<Hosting>, 'hostingResolvers' | 'sizeSteps' | 'isImageUrl'>> {
  types?: Partial<ImageTypes>;
}

export function createImage<Hosting extends string>(options: CreateImageOptions<Hosting> = {}): Image<Hosting> {
  const {
    types: typesOptions,
    hostingResolvers,
    sizeSteps: unresolvedSizeSteps,
    isImageUrl = defaultIsImageUrl
  } = options;
  const types: ImageTypes = { ...IMAGE_TYPES, ...typesOptions };
  const sizeSteps = unresolvedSizeSteps && resolveSizeSteps(unresolvedSizeSteps);
  const getAboveImageFigure: Image<Hosting>['getAboveImageFigure'] = (
    editor: Editor,
    options?: GetAboveByTypesOptions
  ) => getAboveByTypes<ImageFigureElement>(editor, [types.figure], options);
  const getAboveImageCaption: Image<Hosting>['getAboveImageCaption'] = (editor, options) =>
    getAboveByTypes(editor, [types.caption], options);
  const isNodesInImage = (editor: Editor, options?: IsNodesTypeInOptions) =>
    isNodesTypeIn(editor, [types.image], options);
  const isSelectionInImage: Image<Hosting>['isSelectionInImage'] = editor => isNodesInImage(editor);
  const isSelectionInImageCaption: Image<Hosting>['isSelectionInImageCaption'] = editor =>
    isNodesTypeIn(editor, [types.caption]);
  const isCollapsedOnImage: Image<Hosting>['isCollapsedOnImage'] = editor =>
    !!editor.selection && Range.isCollapsed(editor.selection) && isSelectionInImage(editor);
  const createImageElement: Image<Hosting>['createImageElement'] = (src, hosting) => {
    const imageElement: ImageElement = {
      type: types.image,
      src,
      hosting,
      children: [{ text: '' }]
    };
    const captionElement: ImageCaptionElement = {
      type: types.caption,
      children: [{ text: '' }]
    };

    return {
      type: types.figure,
      width: 100,
      children: [imageElement, captionElement]
    };
  };
  const insertImage: Image<Hosting>['insertImage'] = (editor, src, options = {}) => {
    const { hosting, at } = options;
    const imageElement = createImageElement(src, hosting);

    Transforms.insertNodes(editor, [imageElement, Paragraph.createParagraphElement()], { at });
  };
  const adjustWidthPercentage = (percentage: number) => {
    if (percentage < 0) {
      percentage = 0;
    } else if (percentage > 100) {
      percentage = 100;
    }

    if (!sizeSteps) {
      return percentage;
    }

    const lowerIndex = sizeSteps.findIndex(step => step >= percentage) - 1;
    const upperIndex = lowerIndex + 1;

    if (lowerIndex < 0) {
      return sizeSteps[0];
    }

    const lower = sizeSteps[lowerIndex];

    if (upperIndex === sizeSteps.length) {
      return lower;
    }

    const upper = sizeSteps[upperIndex];

    return Math.abs(percentage - lower) <= Math.abs(upper - percentage) ? lower : upper;
  };
  const resizeImage: Image<Hosting>['resizeImage'] = (editor, [, path], width) => {
    const [figure, figurePath] = getAboveImageFigure(editor, { at: path }) || [];

    if (figure) {
      width = adjustWidthPercentage(width);

      if (figure.width !== width) {
        const resizedElement: ImageFigureElement = {
          ...figure,
          width
        };

        Transforms.setNodes(editor, resizedElement, {
          at: figurePath
        });
      }
    }
  };

  return {
    types,
    hostingResolvers,
    sizeSteps,
    isImageUrl,
    getAboveImageFigure,
    getAboveImageCaption,
    isSelectionInImage,
    isSelectionInImageCaption,
    isCollapsedOnImage,
    createImageElement,
    insertImage,
    resizeImage,
    with(editor) {
      const { deleteBackward, deleteForward, insertBreak, isVoid, normalizeNode } = editor;
      const deleteCollapsed = (origin: VoidFunction, isEdgeMethodName: 'isStart' | 'isEnd') => {
        const { selection } = editor;

        /**
         * Avoid from delete fragment outside caption while collapsed in caption.
         */
        if (selection && Range.isCollapsed(selection)) {
          const [, captionPath] = getAboveImageCaption(editor) || [];

          if (captionPath && Editor[isEdgeMethodName](editor, selection.focus, captionPath)) {
            return;
          }
        }

        origin();
      };

      editor.deleteBackward = unit => {
        deleteCollapsed(() => deleteBackward(unit), 'isStart');
      };
      editor.deleteForward = unit => {
        deleteCollapsed(() => deleteForward(unit), 'isEnd');
      };
      editor.insertBreak = () => {
        const captionEntry = getAboveImageCaption(editor);

        /**
         * Avoid from splitting children of caption.
         */
        if (captionEntry) {
          return;
        }

        insertBreak();
      };
      editor.isVoid = element => element.type === types.image || isVoid(element);
      editor.normalizeNode = entry => {
        const [node, path] = entry;

        if (Element.isElement(node)) {
          if (node.type === types.figure) {
            if (!isNodesInImage(editor, { at: path })) {
              Transforms.removeNodes(editor, { at: path });
              return;
            }
          } else if (node.type === types.image) {
            const { src, width, hosting } = node;

            if (
              typeof src !== 'string' ||
              !(width == null || typeof width === 'number') ||
              !(hosting == null || typeof hosting === 'string')
            ) {
              const [, figurePath] = getAboveImageFigure(editor, { at: path }) || [];

              if (figurePath) {
                Transforms.removeNodes(editor, { at: figurePath });
                return;
              }
            }

            if (normalizeVoidElementChildren(editor, [node, path])) {
              return;
            }
          } else if (node.type === types.caption) {
            if (normalizeOnlyInlineOrTextInChildren(editor, entry)) {
              return;
            }
          }
        }

        normalizeNode(entry);
      };

      return editor;
    }
  };
}
