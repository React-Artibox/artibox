import { createReactList, ReactList, ReactListCreateRenderElementOptions } from '@artibox/slate-react/list';
import { ListToolbarIcon } from '@artibox/slate-react/list/toolbar';

export const ReactListDocgen = (t: ReactList) => t;
export const createRenderElementDocgen = (options: ReactListCreateRenderElementOptions) => options;

export const listDocgen = {
  ReactList: ReactListDocgen,
  createReactList,
  '.createRenderElement': createRenderElementDocgen,
  ListToolbarIcon
};
