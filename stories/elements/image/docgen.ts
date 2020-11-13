import {
  ReactImage,
  ReactImageCreateRenderElementOptions,
  ImageElement,
  ImageFigureElement,
  ImageCaptionElement
} from '@artibox/slate-react/image';

export const ReactImageDocgen = (t: ReactImage<string>) => t;
export const createHandlersDocgen = (options: Record<string, unknown>) => options;
export const createRenderElementDocgen = (options: ReactImageCreateRenderElementOptions) => options;
export const ImageFigureElementDocgen = (element: ImageFigureElement) => element;
export const ImageElementDocgen = (element: ImageElement) => element;
export const ImageCaptionElementDocgen = (element: ImageCaptionElement) => element;
