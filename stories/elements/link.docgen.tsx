import { createReactLink, ReactLink, ReactLinkCreateRenderElementOptions } from '@artibox/slate-react/link';
import { LinkToolbarIcon } from '@artibox/slate-react/link/toolbar';

export const ReactLinkDocgen = (t: ReactLink) => t;
export const createRenderElementDocgen = (options?: ReactLinkCreateRenderElementOptions) => options;

export const linkDocgen = {
  ReactLink: ReactLinkDocgen,
  createReactLink,
  '.createRenderElement': createRenderElementDocgen,
  LinkToolbarIcon
};
