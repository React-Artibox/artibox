import { Editor, Location, Range } from 'slate';
import { WithElementType } from '../typings/element';
import { Withable } from '../typings/with';
import { TransformsInsertNodesOptions, TransformsWrapNodesOptions } from '../typings/transforms';
import { UnwrapNodeByTypesOptions } from '../transforms/unwrapNodesByTypes';

export interface LinkInsertLinkOptions extends TransformsInsertNodesOptions {
  text?: string;
}

export type LinkUnwrapLinkOptions = UnwrapNodeByTypesOptions;

export type LinkWrapLinkOptions = Omit<TransformsWrapNodesOptions, 'split'>;

export interface LinkUpsertLinkOptions {
  at?: Range;
}

export interface Link extends WithElementType, Withable {
  isUrl(value: string): boolean;
  /**
   * To get the first previous text which is url and its range.
   */
  getFirstPrevTextAsUrlAndRange(editor: Editor, at: Location): { url: string; at: Range } | undefined;
  isSelectionInLink(editor: Editor): boolean;
  insertLink(editor: Editor, url: string, options?: LinkInsertLinkOptions): void;
  unwrapLink(editor: Editor, options?: LinkUnwrapLinkOptions): void;
  wrapLink(editor: Editor, url: string, options?: LinkWrapLinkOptions): void;
  upsertLink(editor: Editor, url: string, options?: LinkUpsertLinkOptions): void;
}
