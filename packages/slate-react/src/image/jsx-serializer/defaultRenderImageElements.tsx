import React from 'react';
import { ImageJsxSerializeElements } from './typings';

export const defaultRenderImageElements: ImageJsxSerializeElements = {
  figure: ({ children }) => <figure>{children}</figure>,
  image: ({ caption, src, style }) => <img src={src} alt={caption} style={style} />,
  caption: ({ children, isEmpty }) => (isEmpty ? <span /> : <figcaption>{children}</figcaption>)
};
