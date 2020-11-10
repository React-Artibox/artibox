/** @jsx jsx */

import { parseHotkey } from 'is-hotkey';
import { pipe } from '@artibox/utils/pipe';
import { expectEditorEqualOutput, jsx, withTest } from '../../../../__fixtures__/hyperscript';
import { createReactEditor } from '../core';
import { BLOCKQUOTE_HOTKEY, createReactBlockquote } from '.';

const Blockquote = createReactBlockquote();
const handlers = Blockquote.createHandlers();

describe('handlers', () => {
  it('should trigger toggling on hotkey', () => {
    const input = (
      <editor>
        <hp>
          fo
          <cursor />o
        </hp>
      </editor>
    );

    const output = (
      <editor>
        <hblockquote>
          fo
          <cursor />o
        </hblockquote>
      </editor>
    );

    const hotkey = parseHotkey(BLOCKQUOTE_HOTKEY);
    const event = new KeyboardEvent('keydown', hotkey);
    const editor = pipe(createReactEditor(), Blockquote.with, withTest(input));

    handlers.onKeyDown?.(event as any, editor, () => {});

    expectEditorEqualOutput(editor, output);
  });
});
