import {
  ImageCaptionElement,
  ImageCaptionTypeKey,
  ImageElement,
  ImageFigureElement,
  ImageFigureTypeKey,
  ImageTypeKey
} from '@artibox/slate-common/image/common';
import { JsxSerializeElementProps } from '../../jsx-serializer';

export type JsxSerializeImageFigureElementProps = JsxSerializeElementProps<ImageFigureElement>;
export type JsxSerializeImageFigureElement = (
  props: JsxSerializeImageFigureElementProps
) => JSX.Element | null | undefined;

export interface JsxSerializeImageElementProps extends JsxSerializeElementProps<ImageElement> {
  src: string;
  caption?: string;
  style?: {
    width: string;
  };
}
export type JsxSerializeImageElement = (props: JsxSerializeImageElementProps) => JSX.Element | null | undefined;

export interface JsxSerializeImageCaptionElementProps extends JsxSerializeElementProps<ImageCaptionElement> {
  isEmpty: boolean;
}
export type JsxSerializeImageCaptionElement = (
  props: JsxSerializeImageCaptionElementProps
) => JSX.Element | null | undefined;

export type ImageJsxSerializeElements = Record<ImageFigureTypeKey, JsxSerializeImageFigureElement> &
  Record<ImageTypeKey, JsxSerializeImageElement> &
  Record<ImageCaptionTypeKey, JsxSerializeImageCaptionElement>;
