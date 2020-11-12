import { createReactBold } from '@artibox/slate-react/bold';
import {
  ReactToggleMark,
  ReactToggleMarkCreateHandlersOptions,
  ReactToggleMarkCreateRenderLeafOptions
} from '@artibox/slate-react/toggle-mark';
import { ToggleMarkToolbarIcon } from '@artibox/slate-react/toggle-mark/toolbar';

export const ReactToggleMarkDocgen = (t: ReactToggleMark) => t;
export const createHandlersDocgen = (options: ReactToggleMarkCreateHandlersOptions) => options;
export const createRenderLeafDocgen = (options: ReactToggleMarkCreateRenderLeafOptions) => options;

export const boldDocgen = {
  ReactToggleMark: ReactToggleMarkDocgen,
  createReactBold,
  '.createHandlers': createHandlersDocgen,
  '.createRenderLeaf': createRenderLeafDocgen,
  ToggleMarkToolbarIcon
};
