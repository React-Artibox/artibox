import React from 'react';
import { ImageJsxSerializeElements } from './typings';

export const defaultRenderImageElements: ImageJsxSerializeElements = {
  figure: ({ children, style }) => <figure style={style}>{children}</figure>,
  image: ({ caption, src }) => <img src={src} alt={caption} style={{ width: '100%' }} />,
  caption: ({ children, isEmpty }) => (isEmpty ? <span /> : <figcaption>{children}</figcaption>)
};
