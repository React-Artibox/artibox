import isHotkey from 'is-hotkey';
import { CreateBlockquoteOptions, createBlockquote } from '@artibox/slate-common/blockquote';
import { createRenderElement } from '../core';
import { createOnKeyDownBreak } from '../break';
import { ReactBlockquote } from './typings';
import { BLOCKQUOTE_HOTKEY } from './constants';
import { defaultRenderBlockquoteElement } from './defaultRenderBlockquoteElement';

export type CreateReactBlockquoteOptions = CreateBlockquoteOptions;

export function createReactBlockquote(options: CreateReactBlockquoteOptions = {}): ReactBlockquote {
  const core = createBlockquote(options);
  const { type } = core;
  const onKeyDownBreak = createOnKeyDownBreak({
    softBreak: {
      rules: [
        {
          hotkey: 'enter',
          match: {
            includeTypes: [type]
          }
        }
      ]
    }
  });

  return {
    ...core,
    createHandlers: ({ hotkey = BLOCKQUOTE_HOTKEY } = {}) => ({
      onKeyDown: (event, editor, next) => {
        if (isHotkey(hotkey, event as any)) {
          core.toggleBlockquote(editor);
        } else {
          onKeyDownBreak(event, editor, next);
        }
      }
    }),
    createRenderElement: ({ render = defaultRenderBlockquoteElement } = {}) => createRenderElement({ type, render })
  };
}
