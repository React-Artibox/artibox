import { Path } from 'slate';

export function isFirstChild(path: Path) {
  return path[path.length - 1] === 0;
}
