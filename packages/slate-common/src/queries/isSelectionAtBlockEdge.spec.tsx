/** @jsx jsx */

import { jsx } from '../../../../__fixtures__/hyperscript';
import { isSelectionAtBlockEdge } from './isSelectionAtBlockEdge';

describe('isSelectionAtBlockEdge', () => {
  it('collpased on block start', () => {
    const input = (
      <editor>
        <element>
          <cursor />
          foo
        </element>
      </editor>
    ) as any;

    expect(isSelectionAtBlockEdge(input)).toBe('start');
  });

  it('collpased on block center', () => {
    const input = (
      <editor>
        <element>
          fo
          <cursor />o
        </element>
      </editor>
    ) as any;

    expect(isSelectionAtBlockEdge(input)).toBe(undefined);
  });

  it('collpased on block end', () => {
    const input = (
      <editor>
        <element>
          foo
          <cursor />
        </element>
      </editor>
    ) as any;

    expect(isSelectionAtBlockEdge(input)).toBe('end');
  });

  it('expanded, focus on block start', () => {
    const input = (
      <editor>
        <element>
          <focus />
          fo
          <anchor />o
        </element>
      </editor>
    ) as any;

    expect(isSelectionAtBlockEdge(input)).toBe('start');
  });

  it('expanded, focus on block center', () => {
    const input = (
      <editor>
        <element>
          <anchor />
          fo
          <focus />o
        </element>
      </editor>
    ) as any;

    expect(isSelectionAtBlockEdge(input)).toBe(undefined);
  });

  it('expanded, focus on block end', () => {
    const input = (
      <editor>
        <element>
          fo
          <anchor />
          o
          <focus />
        </element>
      </editor>
    ) as any;

    expect(isSelectionAtBlockEdge(input)).toBe('end');
  });
});
