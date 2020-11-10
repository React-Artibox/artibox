/** @jsx jsx */

import { pipe } from '@artibox/utils/pipe';
import { createEditor } from '@artibox/slate-common';
import { expectEditorEqualOutput, jsx, withTest } from '../../../../__fixtures__/hyperscript';
import { toggleNodesType, ToggleNodesTypeOptions } from './toggleNodesType';

function testToggle(input: JSX.Element, output: JSX.Element, activeType: string, options?: ToggleNodesTypeOptions) {
  const editor = pipe(createEditor(), withTest(input));
  toggleNodesType(editor, activeType, options);
  expectEditorEqualOutput(editor, output);
}

describe('toggleNodesType', () => {
  describe('selection not in', () => {
    it('collapsed', () => {
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
          <element type="foo">
            foo
            <cursor />
          </element>
        </editor>
      );

      testToggle(input, output, 'foo');
    });

    it('expanded', () => {
      const input = (
        <editor>
          <element type="foo">foo</element>
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
          <element type="foo">foo</element>
          <element type="foo">
            f
            <anchor />
            o
            <focus />o
          </element>
        </editor>
      );

      testToggle(input, output, 'foo');
    });
  });

  describe('selection in', () => {
    it('collapsed', () => {
      const input = (
        <editor>
          <element type="foo">
            foo
            <inline>foo</inline>
            fo
            <cursor />o
          </element>
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

      testToggle(input, output, 'foo');
    });

    describe('expanded', () => {
      it('in single node', () => {
        const input = (
          <editor>
            <element type="foo">
              <anchor />
              foo
              <focus />
            </element>
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

        testToggle(input, output, 'foo');
      });

      it('half in node', () => {
        const input = (
          <editor>
            <element>foo</element>
            <element type="foo">
              f
              <anchor />
              oo
            </element>
            <hp>
              b
              <focus />
              ar
            </hp>
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

        testToggle(input, output, 'foo');
      });

      it('across multiple nodes', () => {
        const input = (
          <editor>
            <element type="foo">
              f
              <anchor />
              oo
            </element>
            <hp>foo</hp>
            <element type="foo">
              fo
              <focus />o
            </element>
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

        testToggle(input, output, 'foo');
      });
    });
  });

  describe('should also toggle other nodes', () => {
    it('to active', () => {
      const input = (
        <editor>
          <element type="other">
            <anchor />
            text
          </element>
          <element type="bar">
            bar
            <focus />
          </element>
        </editor>
      );

      const output = (
        <editor>
          <element type="foo">
            <anchor />
            text
          </element>
          <element type="foo">
            bar
            <focus />
          </element>
        </editor>
      );

      testToggle(input, output, 'foo', { defaultType: 'bar' });
    });

    it('to inactive', () => {
      const input = (
        <editor>
          <element>
            <anchor />
            text
          </element>
          <element type="foo">foo</element>
          <element type="bar">
            bar
            <focus />
          </element>
        </editor>
      );

      const output = (
        <editor>
          <element type="bar">
            <anchor />
            text
          </element>
          <element type="bar">foo</element>
          <element type="bar">
            bar
            <focus />
          </element>
        </editor>
      );

      testToggle(input, output, 'foo', { defaultType: 'bar' });
    });
  });
});
