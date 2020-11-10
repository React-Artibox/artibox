import { Path } from 'slate';

export function isPathAtRoot(path: Path) {
  return path.length <= 2;
}
