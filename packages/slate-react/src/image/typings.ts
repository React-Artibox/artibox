import {
  Image,
  ImageCaptionElement,
  ImageCaptionTypeKey,
  ImageElement,
  ImageFigureElement,
  ImageFigureTypeKey,
  ImageTypeKey
} from '@artibox/slate-common/image';
import { WithCreateHandlers, WithCreateRenderElement, RenderElementProps, ReactWithable } from '../core';

export interface RenderImageFigureElementProps extends RenderElementProps<ImageFigureElement> {
  style?: {
    width: string;
  };
}
export type RenderImageFigureElement = (props: RenderImageFigureElementProps) => JSX.Element | null | undefined;

export interface RenderImageElementProps extends RenderElementProps<ImageElement> {
  resizeImage: ReactImage<any>['resizeImage'];
  src: string;
}
export type RenderImageElement = (props: RenderImageElementProps) => JSX.Element | null | undefined;

export type RenderImageCaptionElementProps = RenderElementProps<ImageCaptionElement>;
export type RenderImageCaptionElement = (props: RenderImageCaptionElementProps) => JSX.Element | null | undefined;

export type ImageRenderElements = Record<ImageFigureTypeKey, RenderImageFigureElement> &
  Record<ImageTypeKey, RenderImageElement> &
  Record<ImageCaptionTypeKey, RenderImageCaptionElement>;

export type ReactImageCreateRenderElementOptions = {
  [K in ImageFigureTypeKey | ImageTypeKey | ImageCaptionTypeKey]?: ImageRenderElements[K];
};

export type ReactImage<H extends string> = Omit<Image<H>, 'with'> &
  WithCreateHandlers &
  WithCreateRenderElement<[ReactImageCreateRenderElementOptions?]> &
  ReactWithable;
