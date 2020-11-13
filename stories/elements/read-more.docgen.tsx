import {
  createReactReadMore,
  ReactReadMore,
  ReactReadMoreCreateRenderElementOptions
} from '@artibox/slate-react/read-more';
import { ReadMoreToolbarIcon } from '@artibox/slate-react/read-more/toolbar';

export const ReadMoreDocgen = (t: ReactReadMore) => t;
export const createRenderElementDocgen = (options: ReactReadMoreCreateRenderElementOptions) => options;

export const readMoreDocgen = {
  ReadMore: ReadMoreDocgen,
  createReactReadMore,
  '.createRenderElement': createRenderElementDocgen,
  ReadMoreToolbarIcon
};
