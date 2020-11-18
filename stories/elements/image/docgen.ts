import {
  ReactImage,
  ReactImageCreateRenderElementOptions,
  ImageElement,
  ImageFigureElement,
  ImageCaptionElement,
  RenderImageFigureElementProps,
  RenderImageElementProps,
  RenderImageCaptionElementProps
} from '@artibox/slate-react/image';
import {
  JsxSerializeImageFigureElementProps,
  JsxSerializeImageElementProps,
  JsxSerializeImageCaptionElementProps
} from '@artibox/slate-react/image/jsx-serializer';

export const createHandlersDocgen = (options: Record<string, unknown>) => options;
export const createRenderElementDocgen = (options: ReactImageCreateRenderElementOptions) => options;
export const ReactImageDocgen = (t: ReactImage<string>) => t;
export const ImageFigureElementDocgen = (element: ImageFigureElement) => element;
export const ImageElementDocgen = (element: ImageElement) => element;
export const ImageCaptionElementDocgen = (element: ImageCaptionElement) => element;
export const RenderImageFigureElementPropsDocgen = (props: RenderImageFigureElementProps) => props;
export const RenderImageElementPropsDocgen = (props: RenderImageElementProps) => props;
export const RenderImageCaptionElementPropsDocgen = (props: RenderImageCaptionElementProps) => props;
export const JsxSerializeImageFigureElementPropsDocgen = (props: JsxSerializeImageFigureElementProps) => props;
export const JsxSerializeImageElementPropsDocgen = (props: JsxSerializeImageElementProps) => props;
export const JsxSerializeImageCaptionElementPropsDocgen = (props: JsxSerializeImageCaptionElementProps) => props;
