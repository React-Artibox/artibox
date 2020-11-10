/** @jsx jsx */

import { expectEditorEqualOutput, jsx } from '../../../../__fixtures__/hyperscript';
import { createToggleMarkCreator } from './createToggleMarkCreator';

const createToggleMark = createToggleMarkCreator({ type: 'foo' });

describe('ToggleMark', () => {
  const ToggleMark = createToggleMark();

  it('should has type', () => {
    expect(ToggleMark.type).toBe('foo');
  });

  describe('collapsed in mark', () => {
    const input = (
      <editor>
        <element>
          <htext foo>fo</htext>o
        </element>
        <selection>
          <cursor path={[0, 0]} offset={1} />
        </selection>
      </editor>
    ) as any;

    it('should be active', () => {
      expect(ToggleMark.isToggleMarkActive(input)).toBe(true);
    });
  });

  describe('collapsed not in mark', () => {
    const input = (
      <editor>
        <element>
          <htext foo>fo</htext>o
        </element>
        <selection>
          <cursor path={[0, 1]} offset={1} />
        </selection>
      </editor>
    ) as any;

    it('should be inactive', () => {
      expect(ToggleMark.isToggleMarkActive(input)).toBe(false);
    });
  });

  describe('collapsed not in mark, next to mark', () => {
    const input = (
      <editor>
        <element>
          <htext foo>fo</htext>o
        </element>
        <selection>
          <cursor path={[0, 1]} offset={0} />
        </selection>
      </editor>
    ) as any;

    it('should be active', () => {
      expect(ToggleMark.isToggleMarkActive(input)).toBe(true);
    });
  });

  describe('expanded in mark', () => {
    const input = (
      <editor>
        <element>
          <htext foo>fo</htext>o
        </element>
        <selection>
          <anchor path={[0, 0]} offset={0} />
          <focus path={[0, 0]} offset={2} />
        </selection>
      </editor>
    ) as any;

    const output = (
      <editor>
        <element>foo</element>
        <selection>
          <anchor path={[0, 0]} offset={0} />
          <focus path={[0, 0]} offset={2} />
        </selection>
      </editor>
    ) as any;

    it('should be active', () => {
      expect(ToggleMark.isToggleMarkActive(input)).toBe(true);
    });

    it('after toggle', () => {
      ToggleMark.toggleMark(input);
      expectEditorEqualOutput(input, output);
    });
  });

  describe('expanded in half of mark, before mark', () => {
    const input = (
      <editor>
        <element>
          fo<htext foo>o</htext>
        </element>
        <selection>
          <anchor path={[0, 0]} offset={0} />
          <focus path={[0, 1]} offset={1} />
        </selection>
      </editor>
    ) as any;

    const output = (
      <editor>
        <element>
          <htext foo>foo</htext>
        </element>
        <selection>
          <anchor path={[0, 0]} offset={0} />
          <focus path={[0, 0]} offset={3} />
        </selection>
      </editor>
    ) as any;

    it('should be inactive', () => {
      expect(ToggleMark.isToggleMarkActive(input)).toBe(false);
    });

    it('after toggle', () => {
      ToggleMark.toggleMark(input);
      expectEditorEqualOutput(input, output);
    });
  });

  describe('expanded in half of mark, after mark', () => {
    const input = (
      <editor>
        <element>
          <htext foo>fo</htext>o
        </element>
        <selection>
          <anchor path={[0, 0]} offset={0} />
          <focus path={[0, 1]} offset={1} />
        </selection>
      </editor>
    ) as any;

    const output = (
      <editor>
        <element>foo</element>
        <selection>
          <anchor path={[0, 0]} offset={0} />
          <focus path={[0, 0]} offset={3} />
        </selection>
      </editor>
    ) as any;

    it('should be active', () => {
      expect(ToggleMark.isToggleMarkActive(input)).toBe(true);
    });

    it('after toggle', () => {
      ToggleMark.toggleMark(input);
      expectEditorEqualOutput(input, output);
    });
  });

  describe('expanded not in mark', () => {
    const input = (
      <editor>
        <element>
          <htext foo>fo</htext>obar
        </element>
        <selection>
          <anchor path={[0, 1]} offset={0} />
          <focus path={[0, 1]} offset={3} />
        </selection>
      </editor>
    ) as any;

    const output = (
      <editor>
        <element>
          <htext foo>fooba</htext>r
        </element>
        <selection>
          <anchor path={[0, 0]} offset={2} />
          <focus path={[0, 0]} offset={5} />
        </selection>
      </editor>
    ) as any;

    it('should be inactive', () => {
      expect(ToggleMark.isToggleMarkActive(input)).toBe(false);
    });

    it('after toggle', () => {
      ToggleMark.toggleMark(input);
      expectEditorEqualOutput(input, output);
    });
  });
});
