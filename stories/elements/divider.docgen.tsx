import { createReactDivider, ReactDivider, ReactDividerCreateRenderElementOptions } from '@artibox/slate-react/divider';
import { DividerToolbarIcon } from '@artibox/slate-react/divider/toolbar';

export const ReactDividerDocgen = (t: ReactDivider) => t;
export const createRenderElementDocgen = (options: ReactDividerCreateRenderElementOptions) => options;

export const dividerDocgen = {
  ReactDivider: ReactDividerDocgen,
  createReactDivider,
  '.createRenderElement': createRenderElementDocgen,
  DividerToolbarIcon
};
