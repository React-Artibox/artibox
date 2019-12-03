import { Editor } from 'slate';
import { MouseEventHandler } from 'react';
import { SetInputConfig } from './input';

/**
 * The react hook for `@artibox/slate-toolbar`.
 *
 * @param setInputConfig - Default callback to start the input process of link, embed, ...etc.
 */
export type ToolHook = (
  editor: Editor,
  setInputConfig: SetInputConfig
) => {
  active?: boolean;
  onMouseDown: MouseEventHandler;
};

/**
 * A factory for creating react hook for toolbar icon in `@artibox/slate-toolbar`.
 *
 * @typeparam C - configuration type.
 */
export interface ForToolHook<C> {
  forToolHook(config?: C): ToolHook;
}
