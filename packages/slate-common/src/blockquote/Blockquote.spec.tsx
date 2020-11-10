/** @jsx jsx */

import { Editor } from 'slate';
import { pipe } from '@artibox/utils/pipe';
import { createEditor } from '@artibox/slate-common';
import { expectEditorEqualOutput, jsx, withTest } from '../../../../__fixtures__/hyperscript';
import { BLOCKQUOTE_TYPE, createBlockquote } from '.';

const Blockquote = createBlockquote();

function testSelectionInAndToggle(expectedSelectionIn: boolean, input: JSX.Element, output: JSX.Element) {
  const editor = pipe(createEditor(), Blockquote.with, withTest(input));

  it(`isSelectionIn should be ${expectedSelectionIn ? 'active' : 'inactive'}`, () => {
    expect(Blockquote.isSelectionInBlockquote(editor)).toBe(expectedSelectionIn);
  });

  it('after toggle', () => {
    Blockquote.toggleBlockquote(editor);
    expectEditorEqualOutput(editor, output);
    expect(Blockquote.isSelectionInBlockquote(editor)).toBe(!expectedSelectionIn);
  });
}

describe('controller', () => {
  it('should has type', () => {
    expect(Blockquote.type).toBe(BLOCKQUOTE_TYPE);
  });

  describe('selection not in blockquote', () => {
    describe('collapsed', () => {
      const input = (
        <editor>
          <hp>
            foo
            <cursor />
          </hp>
        </editor>
      );

      const output = (
        <editor>
          <hblockquote>
            foo
            <cursor />
          </hblockquote>
        </editor>
      );

      testSelectionInAndToggle(false, input, output);
    });

    describe('expanded', () => {
      const input = (
        <editor>
          <hblockquote>foo</hblockquote>
          <hp>
            f
            <anchor />
            o
            <focus />o
          </hp>
        </editor>
      );

      const output = (
        <editor>
          <hblockquote>foo</hblockquote>
          <hblockquote>
            f
            <anchor />
            o
            <focus />o
          </hblockquote>
        </editor>
      );

      testSelectionInAndToggle(false, input, output);
    });
  });

  describe('selection in blockquote', () => {
    describe('collapsed', () => {
      const input = (
        <editor>
          <hblockquote>
            foo
            <inline>foo</inline>
            fo
            <cursor />o
          </hblockquote>
        </editor>
      );

      const output = (
        <editor>
          <hp>
            foo
            <inline>foo</inline>
            fo
            <cursor />o
          </hp>
        </editor>
      );

      testSelectionInAndToggle(true, input, output);
    });
  });

  describe('expanded', () => {
    describe('in single blockquote', () => {
      const input = (
        <editor>
          <hblockquote>
            <anchor />
            foo
            <focus />
          </hblockquote>
        </editor>
      );

      const output = (
        <editor>
          <hp>
            <anchor />
            foo
            <focus />
          </hp>
        </editor>
      );

      testSelectionInAndToggle(true, input, output);
    });

    describe('half in blockquote', () => {
      const input = (
        <editor>
          <element>foo</element>
          <hblockquote>
            f
            <anchor />
            oo
          </hblockquote>
          <element>
            b
            <focus />
            ar
          </element>
        </editor>
      );

      const output = (
        <editor>
          <element>foo</element>
          <hp>
            f
            <anchor />
            oo
          </hp>
          <hp>
            b
            <focus />
            ar
          </hp>
        </editor>
      );

      testSelectionInAndToggle(true, input, output);
    });

    describe('across multiple blockquotes', () => {
      const input = (
        <editor>
          <hblockquote>
            f
            <anchor />
            oo
          </hblockquote>
          <element>foo</element>
          <hblockquote>
            fo
            <focus />o
          </hblockquote>
        </editor>
      );

      const output = (
        <editor>
          <hp>
            f
            <anchor />
            oo
          </hp>
          <hp>foo</hp>
          <hp>
            fo
            <focus />o
          </hp>
        </editor>
      );

      testSelectionInAndToggle(true, input, output);
    });
  });
});

describe('with', () => {
  it('shoulde be block element', () => {
    const input = (
      <hhr>
        <text></text>
      </hhr>
    ) as any;

    const editor = pipe(createEditor(), Blockquote.with);

    expect(Editor.isBlock(editor, input)).toBe(true);
  });

  it('should only accept inlines and texts', () => {
    const input = (
      <hblockquote>
        abc
        <element>def</element>
        <inline>ghi</inline>
        <void></void>
        jkl
      </hblockquote>
    ) as any;

    const output = (
      <hblockquote>
        abcdef
        <inline>ghi</inline>
        jkl
      </hblockquote>
    );

    const editor = pipe(createEditor(), Blockquote.with, withTest());

    editor.insertNode(input);

    expect(editor.children[0]).toEqual(output);
  });
});
