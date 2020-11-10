/** @jsx jsx */

import { pipe } from '@artibox/utils/pipe';
import { createEditor } from '@artibox/slate-common';
import { expectEditorEqualOutput, jsx, withTest } from '../../../../__fixtures__/hyperscript';
import { DIVIDER_TYPE, createDivider } from '.';

const Divider = createDivider();

describe('controller', () => {
  it('should has type', () => {
    expect(Divider.type).toBe(DIVIDER_TYPE);
  });

  it('should insert trailing element and move selection to it', () => {
    const input = (
      <editor>
        <element>
          foo
          <cursor />
        </element>
      </editor>
    );

    const output = (
      <editor>
        <element>foo</element>
        <hhr>
          <text></text>
        </hhr>
        <hp>
          <cursor />
        </hp>
      </editor>
    );

    const editor = pipe(createEditor(), Divider.with, withTest(input));

    Divider.insertDivider(editor);

    expectEditorEqualOutput(editor, output);
  });
});

describe('with', () => {
  it('should be void element', () => {
    const input = (
      <hhr>
        <text></text>
      </hhr>
    ) as any;

    const editor = pipe(createEditor(), Divider.with);

    expect(editor.isVoid(input)).toBe(true);
  });

  it('should normalize to only with single empty text', () => {
    const input = (
      <hhr>
        <text>abc</text>
        <text>def</text>
      </hhr>
    ) as any;

    const output = (
      <hhr>
        <text></text>
      </hhr>
    );

    const editor = pipe(createEditor(), Divider.with);

    editor.insertNode(input);

    expect(editor.children[0]).toEqual(output);
  });
});
