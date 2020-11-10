import { Element } from 'slate';

export interface WithElementParent {
  parent: (Element & WithElementParent) | undefined;
}
