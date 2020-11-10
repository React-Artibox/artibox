import { Editor, Element, Location, NodeEntry } from 'slate';
import { GetAboveByTypesOptions } from '../queries/getAboveByTypes';
import { Withable } from '../typings/with';
import { ImageCaptionElement, ImageFigureElement, ImageHostingResolvers, ImageSizeSteps, ImageTypes } from './common';

export type ImageGetAboveImageFigureOptions = GetAboveByTypesOptions;
export type ImageGetAboveImageCaptionOptions = GetAboveByTypesOptions;

export interface Image<H extends string> extends Withable {
  types: ImageTypes;
  hostingResolvers?: ImageHostingResolvers<H>;
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
  createImageElement(src: string, hosting?: H): ImageFigureElement;
  insertImage(
    editor: Editor,
    src: string,
    options?: {
      hosting?: H;
      at?: Location;
    }
  ): void;
  resizeImage(editor: Editor, entry: NodeEntry<Element>, width: number): void;
}
