import { List, ListElement, ListTypeKey } from '@artibox/slate-common/list';
import { WithCreateHandlers, WithCreateRenderElement, RenderElementProps } from '../core';

export type RenderListElementProps = RenderElementProps<ListElement>;

export type ReactListCreateRenderElementOptions = {
  [key in ListTypeKey]?: (props: RenderListElementProps) => JSX.Element | null | undefined;
};

export interface ReactList
  extends List,
    WithCreateHandlers,
    WithCreateRenderElement<[ReactListCreateRenderElementOptions?]> {}
