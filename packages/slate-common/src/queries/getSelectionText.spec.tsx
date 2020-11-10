/** @jsx jsx */

import { jsx } from '../../../../__fixtures__/hyperscript';
import { getSelectionText } from './getSelectionText';

describe('getSelectionText', () => {
  it('collapsed, should w/o text', () => {
    const input = (
      <editor>
        <element>
          <cursor />
          foo
        </element>
      </editor>
    ) as any;

    expect(getSelectionText(input)).toBe('');
  });

  it('expanded, in single block', () => {
    const input = (
      <editor>
        <element>
          <anchor />
          foo
          <focus />
        </element>
      </editor>
    ) as any;

    expect(getSelectionText(input)).toBe('foo');
  });

  it('expanded, across blocks', () => {
    const input = (
      <editor>
        <element>
          f
          <anchor />
          oo
        </element>
        <element>
          b
          <focus />
          ar
        </element>
      </editor>
    ) as any;

    expect(getSelectionText(input)).toBe('oob');
  });

  it('expanded, across blocks w/ hanging range', () => {
    const input = (
      <editor>
        <element>
          f
          <anchor />
          oo
        </element>
        <element>
          <focus />
          bar
        </element>
      </editor>
    ) as any;

    expect(getSelectionText(input)).toBe('oo');
  });
});
