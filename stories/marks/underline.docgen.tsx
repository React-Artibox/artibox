import { createReactUnderline } from '@artibox/slate-react/underline';
import {
  ReactToggleMark,
  ReactToggleMarkCreateHandlersOptions,
  ReactToggleMarkCreateRenderLeafOptions
} from '@artibox/slate-react/toggle-mark';
import { ToggleMarkToolbarIcon } from '@artibox/slate-react/toggle-mark/toolbar';

export const ReactToggleMarkDocgen = (t: ReactToggleMark) => t;
export const createHandlersDocgen = (options: ReactToggleMarkCreateHandlersOptions) => options;
export const createRenderLeafDocgen = (options: ReactToggleMarkCreateRenderLeafOptions) => options;

export const underlineDocgen = {
  ReactToggleMark: ReactToggleMarkDocgen,
  createReactUnderline,
  '.createHandlers': createHandlersDocgen,
  '.createRenderLeaf': createRenderLeafDocgen,
  ToggleMarkToolbarIcon
};
