import { Editor, Element, Location, NodeEntry } from 'slate';
import { GetAboveByTypesOptions } from '../queries/getAboveByTypes';
import { Withable } from '../typings/with';
import { ImageCaptionElement, ImageFigureElement, ImageHostingResolvers, ImageSizeSteps, ImageTypes } from './common';

export type ImageGetAboveImageFigureOptions = GetAboveByTypesOptions;
export type ImageGetAboveImageCaptionOptions = GetAboveByTypesOptions;

export interface Image<Hosting extends string> extends Withable {
  /**
   * An object which keys are `figure`, `image`, 'caption` and values are the corresponding element types.
   */
  types: ImageTypes;
  /**
   * @see {ImageHostingResolvers<Hosting>}
   */
  hostingResolvers?: ImageHostingResolvers<Hosting>;
  /**
   * @see {ImageSizeSteps}
   */
  sizeSteps?: ImageSizeSteps;
  isImageUrl(url: string): boolean;
  getAboveImageFigure(
    editor: Editor,
    options?: ImageGetAboveImageFigureOptions
  ): NodeEntry<ImageFigureElement> | undefined;
  getAboveImageCaption(
    editor: Editor,
    options?: ImageGetAboveImageCaptionOptions
  ): NodeEntry<ImageCaptionElement> | undefined;
  isSelectionInImage(editor: Editor): boolean;
  isSelectionInImageCaption(editor: Editor): boolean;
  isCollapsedOnImage(editor: Editor): boolean;
  createImageElement(src: string, hosting?: Hosting): ImageFigureElement;
  insertImage(
    editor: Editor,
    src: string,
    options?: {
      hosting?: Hosting;
      at?: Location;
    }
  ): void;
  resizeImage(editor: Editor, entry: NodeEntry<Element>, width: number): void;
}
