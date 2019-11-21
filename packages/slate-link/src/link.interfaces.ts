import { Inline, Editor } from 'slate';

export interface LinkController {
  isLink(inline?: Inline | null): boolean;
  isSelectionInLink(editor: Editor): boolean;
  getCurrentAllLinks(editor: Editor): Inline[];
  getCurrentFirstLink(editor: Editor): Inline | null;
  getCurrentFirstLinkUrl(editor: Editor): string | undefined;
  createLinkInline(url: string, text?: string): Inline;
  removeLinkInline(editor: Editor): Editor;
  setLinkInline(editor: Editor, url: string, text?: string): Editor;
}
