import { Inline, Text, Editor } from 'slate';
import { HasNodeType } from '@artibox/slate-common';
import { LINK_DATA_KEY_URL } from './link.constants';
import { getUrlFromInline } from './link.utils';

export abstract class LinkController implements HasNodeType {
  constructor(public readonly type: string) {}

  isInlineAs = (inline?: Inline | null): boolean => inline?.type === this.type;

  isSelectionIn = (editor: Editor): boolean => this.getCurrentAll(editor).length > 0;

  getCurrentAll = (editor: Editor): Inline[] => editor.value.inlines.filter(this.isInlineAs).toArray();

  getCurrentFirst = (editor: Editor): Inline | null => {
    const [link = null] = this.getCurrentAll(editor);
    return link;
  };
  getUrlOfCurrentFirst = (editor: Editor): string | undefined => {
    const link = this.getCurrentFirst(editor);
    return link ? getUrlFromInline(link) : undefined;
  };

  createInline = (url: string, text?: string): Inline =>
    Inline.fromJSON({
      type: this.type,
      data: { [LINK_DATA_KEY_URL]: url },
      nodes: text ? [Text.fromJSON({ text })] : undefined
    });

  remove = (editor: Editor): Editor => {
    const hasAnyLink = this.isSelectionIn(editor);

    if (!hasAnyLink) {
      return editor;
    }

    return this.getCurrentAll(editor).reduce((prev, inline) => prev!.unwrapInline(inline!.type), editor);
  };

  set = (editor: Editor, url: string, text?: string): Editor => {
    const { isExpanded } = editor.value.selection;

    if (isExpanded) {
      return this.remove(editor).wrapInline(this.createInline(url));
    } else if (!text) {
      return editor;
    }

    return editor.insertInline(this.createInline(url, text));
  };
}
