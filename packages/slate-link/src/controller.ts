import { Inline, Editor } from 'slate';
import { NodeType } from '@artibox/slate-common';
import { getLinkUrlFromInline } from './utils/get-link-url-from-inline';
import { createLinkInline } from './utils/create-link-inline';

export interface LinkController {
  /**
   * Check if the inline is link.
   */
  isInlineAs(inline?: Inline | null): boolean;
  /**
   * Check if there are some links in the current selection.
   */
  isSelectionIn(editor: Editor): boolean;
  /**
   * Get all links in the current selection.
   */
  getCurrentAll(editor: Editor): Inline[];
  /**
   * Get the first link in the current selection.
   */
  getCurrentFirst(editor: Editor): Inline | null;
  /**
   * Get url of the first link in the current selection.
   */
  getUrlOfCurrentFirst(editor: Editor): string | undefined;
  /**
   * Remove all links in the current selection.
   */
  remove(editor: Editor): Editor;
  /**
   * 1. If exapnded, set the selected text as link.
   * 2. If collapsed, insert a text and set it as link.
   */
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
  const remove: LinkController['remove'] = editor =>
    isSelectionIn(editor)
      ? getCurrentAll(editor).reduce((prev, inline) => prev!.unwrapInline(inline!.type), editor)
      : editor;
  const set: LinkController['set'] = (editor, url, text) => {
    const { isExpanded } = editor.value.selection;

    if (isExpanded) {
      return remove(editor).wrapInline(createLinkInline(type, url));
    } else if (!text) {
      return editor;
    }

    return editor.insertInline(createLinkInline(type, url, text));
  };

  return {
    isInlineAs,
    isSelectionIn,
    getCurrentAll,
    getCurrentFirst,
    getUrlOfCurrentFirst,
    remove,
    set
  };
}
