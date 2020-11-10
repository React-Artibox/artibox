import { Element } from 'slate';
import { WithElementParent } from '../typings';

export function getFirstAncestor<E extends Element>(
  element: Element & WithElementParent,
  match: (element: Element & WithElementParent) => boolean
): (E & WithElementParent) | undefined {
  const { parent } = element;
  return (parent && !match(parent) ? getFirstAncestor(parent, match) : parent) as (E & WithElementParent) | undefined;
}
