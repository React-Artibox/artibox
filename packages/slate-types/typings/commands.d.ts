import { CommandFunc } from 'slate';

export type Commands<K extends string> = {
  [key in K]: CommandFunc;
};
