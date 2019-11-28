import { Inline, Text, Editor } from 'slate';
import { NodeType } from '@artibox/slate-common';
import { getLinkUrlFromInline } from './utils/get-link-url-from-inline';

export interface LinkController {
  isInlineAs(inline?: Inline | null): boolean;
  isSelectionIn(editor: Editor): boolean;
  getCurrentAll(editor: Editor): Inline[];
  getCurrentFirst(editor: Editor): Inline | null;
  getUrlOfCurrentFirst(editor: Editor): string | undefined;
  createInline(url: string, text?: string): Inline;
  remove(editor: Editor): Editor;
  set(editor: Editor, url: string, text?: string): Editor;
}

export type CreateLinkControllerConfig = NodeType;

export function createLinkController(config: CreateLinkControllerConfig): LinkController {
  const { type } = config;
  const isInlineAs: LinkController['isInlineAs'] = inline => inline?.type === type;
  const getCurrentAll: LinkController['getCurrentAll'] = editor => editor.value.inlines.filter(isInlineAs).toArray();
  const isSelectionIn: LinkController['isSelectionIn'] = editor => getCurrentAll(editor).length > 0;
  const getCurrentFirst: LinkController['getCurrentFirst'] = editor => {
    const [link = null] = getCurrentAll(editor);
    return link;
  };
  const getUrlOfCurrentFirst: LinkController['getUrlOfCurrentFirst'] = editor => {
    const link = getCurrentFirst(editor);
    return link ? getLinkUrlFromInline(link) : undefined;
  };
  const createInline: LinkController['createInline'] = (url, text) =>
    Inline.fromJSON({
      type,
      data: { href: url },
      nodes: text ? [Text.fromJSON({ text })] : undefined
    });
  const remove: LinkController['remove'] = editor => {
    const hasAnyLink = isSelectionIn(editor);

    if (!hasAnyLink) {
      return editor;
    }

    return getCurrentAll(editor).reduce((prev, inline) => prev!.unwrapInline(inline!.type), editor);
  };
  const set: LinkController['set'] = (editor, url, text) => {
    const { isExpanded } = editor.value.selection;

    if (isExpanded) {
      return remove(editor).wrapInline(createInline(url));
    } else if (!text) {
      return editor;
    }

    return editor.insertInline(createInline(url, text));
  };

  return {
    isInlineAs,
    isSelectionIn,
    getCurrentAll,
    getCurrentFirst,
    getUrlOfCurrentFirst,
    createInline,
    remove,
    set
  };
}
