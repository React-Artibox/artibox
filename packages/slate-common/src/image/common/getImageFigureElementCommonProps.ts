import { ImageFigureElement } from './typings';

export function getImageFigureElementCommonProps(
  element: ImageFigureElement
): {
  style?: {
    width: string;
  };
} {
  const { width } = element;

  return {
    style: typeof width === 'number' ? { width: `${width}%` } : undefined
  };
}
