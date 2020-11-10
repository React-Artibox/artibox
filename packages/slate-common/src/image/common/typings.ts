import { Element, Text } from 'slate';

export type ImageHostingResolvers<H extends string> = {
  [hosting in H]: (url: string) => string;
};

export type ImageSizeSteps = ReadonlyArray<number>;

export type ImageFigureTypeKey = 'figure';
export type ImageTypeKey = 'image';
export type ImageCaptionTypeKey = 'caption';

export type ImageTypes = Record<ImageFigureTypeKey | ImageTypeKey | ImageCaptionTypeKey, string>;

export interface ImageFigureElement extends Element {
  type: string;
  width?: number;
}

export interface ImageElement extends Element {
  type: string;
  children: [Text];
  src: string;
  hosting?: string;
}

export interface ImageCaptionElement extends Element {
  type: string;
}
