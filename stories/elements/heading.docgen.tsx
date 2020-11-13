import {
  createReactHeading,
  ReactHeading,
  HeadingLevel,
  ReactHeadingCreateHandlersOptions,
  ReactHeadingCreateRenderElementOptions
} from '@artibox/slate-react/heading';
import { HeadingToolbarIcon } from '@artibox/slate-react/heading/toolbar';

export const ReactHeadingDocgen = (t: ReactHeading<HeadingLevel>) => t;
export const createHandlersDocgen = (options: ReactHeadingCreateHandlersOptions) => options;
export const createRenderElementDocgen = (options: ReactHeadingCreateRenderElementOptions) => options;

export const headingDocgen = {
  ReactHeading: ReactHeadingDocgen,
  createReactHeading,
  '.createHandlers': createHandlersDocgen,
  '.createRenderElement': createRenderElementDocgen,
  HeadingToolbarIcon
};
