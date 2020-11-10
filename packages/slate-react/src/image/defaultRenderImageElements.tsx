import React from 'react';
import ImageFigure from './components/ImageFigure';
import Image from './components/Image';
import ImageCaption from './components/ImageCaption';
import { ImageRenderElements } from './typings';

export const defaultRenderImageElements: ImageRenderElements = {
  figure: props => <ImageFigure {...props} />,
  image: props => <Image {...props} />,
  caption: props => <ImageCaption {...props} />
};
