import { InputBlock, InputBlockElement } from '@artibox/slate-common/input-block';
import { ReactEditor } from 'slate-react';
import { WithCreateRenderElement, RenderElementProps } from '../core';

export type RenderInputBlockElementProps = RenderElementProps<InputBlockElement> &
  Pick<ReactInputBlock, 'remove' | 'confirm'>;

export type RenderInputBlockElement = (props: RenderInputBlockElementProps) => JSX.Element | null | undefined;

export interface ReactInputBlockCreateRenderElementOptions {
  render?: RenderInputBlockElement;
}

export interface ReactInputBlock
  extends Omit<InputBlock, 'remove' | 'confirm'>,
    WithCreateRenderElement<[ReactInputBlockCreateRenderElementOptions?]> {
  remove(editor: ReactEditor, element: InputBlockElement): void;
  confirm(editor: ReactEditor, element: InputBlockElement, value: string): void;
}
