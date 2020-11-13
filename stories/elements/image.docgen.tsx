import { createReactImage, ReactImage, ReactImageCreateRenderElementOptions } from '@artibox/slate-react/image';

export const ReactImageDocgen = (t: ReactImage<string>) => t;
export const createRenderElementDocgen = (options: ReactImageCreateRenderElementOptions) => options;

export const imageDocgen = {
  ReactImage: ReactImageDocgen,
  createReactImage,
  '.createRenderElement': createRenderElementDocgen
};
