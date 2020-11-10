import { Editor, Location, Path, Point } from 'slate';
import { EditorBeforeOptions } from '../typings/editor';

interface StackItemForUnitOffset {
  point: Point;
  text: string;
}

export type GetPointBeforeOptionsMatchFn = (value: {
  beforeString: string;
  beforePoint: Point;
  at: Location;
}) => boolean;

export interface GetPointBeforeOptions extends EditorBeforeOptions {
  /**
   * @default false
   *
   * Allow lookup across multiple node paths.
   */
  acrossPaths?: boolean;
  /**
   * @default false
   *
   * If true, get the point after the matching point.
   * Or get the matching point.
   */
  afterMatch?: boolean;
  /**
   * Lookup before the location until matching.
   *
   * If as `string`, lookup until match the string.
   * Or until the `until` fn return `true`.
   */
  match?: string | GetPointBeforeOptionsMatchFn;
}

/**
 * @todo
 * Support for sequencing of any characters.
 */
export function getPointBefore(editor: Editor, at: Location, options: GetPointBeforeOptions = {}): Point | undefined {
  const { acrossPaths = false, afterMatch = false, match, unit = 'offset' } = options;

  if (!match) {
    return Editor.before(editor, at, options);
  }

  const lengthOfPointAndTextStackForUnitOffset = (typeof match === 'string' ? match.length : 0) + 1;
  const pointAndTextStackForUnitOffset =
    unit === 'offset' ? Array<StackItemForUnitOffset | undefined>(lengthOfPointAndTextStackForUnitOffset) : undefined;
  const matchFn: GetPointBeforeOptionsMatchFn =
    typeof match === 'string' ? ({ beforeString }) => beforeString === match : match;
  let beforeAt = at;
  let previousBeforePoint = Editor.point(editor, at, { edge: 'end' });

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const beforePoint = Editor.before(editor, beforeAt, options);

    /**
     * 404 or different path
     */
    if (!beforePoint || (!acrossPaths && !Path.equals(beforePoint.path, previousBeforePoint.path))) {
      return;
    }

    let beforeString = Editor.string(editor, {
      anchor: beforePoint,
      focus: previousBeforePoint
    });

    if (pointAndTextStackForUnitOffset) {
      pointAndTextStackForUnitOffset.unshift({
        point: beforePoint,
        text: beforeString
      });
      pointAndTextStackForUnitOffset.pop();
      beforeString = pointAndTextStackForUnitOffset
        .slice(0, -1)
        .map(item => item?.text || '')
        .join('');
    }

    if (matchFn({ beforeString, beforePoint, at })) {
      return afterMatch
        ? pointAndTextStackForUnitOffset
          ? pointAndTextStackForUnitOffset[pointAndTextStackForUnitOffset.length - 1]?.point
          : previousBeforePoint
        : beforePoint;
    }

    beforeAt = beforePoint;
    previousBeforePoint = beforePoint;
  }
}
