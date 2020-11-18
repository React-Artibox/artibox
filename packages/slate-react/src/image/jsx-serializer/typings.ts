import {
  ImageCaptionElement,
  ImageCaptionTypeKey,
  ImageElement,
  ImageFigureElement,
  ImageFigureTypeKey,
  ImageTypeKey
} from '@artibox/slate-common/image/common';
import { JsxSerializeElementProps } from '../../jsx-serializer';

export interface JsxSerializeImageFigureElementProps extends JsxSerializeElementProps<ImageFigureElement> {
  style?: {
    width: string;
  };
}

export interface JsxSerializeImageElementProps extends JsxSerializeElementProps<ImageElement> {
  src: string;
  caption?: string;
}

export interface JsxSerializeImageCaptionElementProps extends JsxSerializeElementProps<ImageCaptionElement> {
  isEmpty: boolean;
}

export type ImageJsxSerializeElements = Record<
  ImageFigureTypeKey,
  (props: JsxSerializeImageFigureElementProps) => JSX.Element | null | undefined
> &
  Record<ImageTypeKey, (props: JsxSerializeImageElementProps) => JSX.Element | null | undefined> &
  Record<ImageCaptionTypeKey, (props: JsxSerializeImageCaptionElementProps) => JSX.Element | null | undefined>;
