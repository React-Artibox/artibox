import {
  ReactLink,
  ReactLinkCreateRenderElementOptions,
  LinkElement,
  RenderLinkElementProps
} from '@artibox/slate-react/link';
import { JsxSerializeLinkElementProps } from '@artibox/slate-react/link/jsx-serializer';

export const createRenderElementDocgen = (options?: ReactLinkCreateRenderElementOptions) => options;
export const ReactLinkDocgen = (t: ReactLink) => t;
export const LinkElementDocgen = (element: LinkElement) => element;
export const RenderLinkElementPropsDocgen = (props: RenderLinkElementProps) => props;
export const JsxSerializeLinkElementPropsDocgen = (props: JsxSerializeLinkElementProps) => props;
