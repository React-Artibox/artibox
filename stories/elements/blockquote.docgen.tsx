import {
  createReactBlockquote,
  ReactBlockquote,
  ReactBlockquoteCreateHandlersOptions,
  ReactBlockquoteCreateRenderElementOptions
} from '@artibox/slate-react/blockquote';
import { BlockquoteToolbarIcon } from '@artibox/slate-react/blockquote/toolbar';

export const ReactBlockquoteDocgen = (t: ReactBlockquote) => t;
export const createHandlersDocgen = (options: ReactBlockquoteCreateHandlersOptions) => options;
export const createRenderLeafDocgen = (options: ReactBlockquoteCreateRenderElementOptions) => options;

export const blockquoteDocgen = {
  ReactBlockquote: ReactBlockquoteDocgen,
  createReactBlockquote,
  '.createHandlers': createHandlersDocgen,
  '.createRenderElement': createRenderLeafDocgen,
  BlockquoteToolbarIcon
};
