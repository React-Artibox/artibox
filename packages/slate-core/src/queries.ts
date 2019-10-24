import { QueryFunc } from 'slate';

export type Queries<K extends string> = {
  [key in K]: QueryFunc;
};
