import { Element } from 'slate';
import { WithElementType } from '../typings/element';
import { isNodesTypeIn } from '../queries/isNodesTypeIn';
import { toggleNodesType } from '../transforms/toggleNodesType';
import { normalizeOnlyInlineOrTextInChildren } from '../normalizers/normalizeOnlyInlineOrTextInChildren';
import { BLOCKQUOTE_TYPE } from './common';
import { Blockquote } from './typings';

export type CreateBlockquoteOptions = Partial<WithElementType>;

export function createBlockquote({ type = BLOCKQUOTE_TYPE }: CreateBlockquoteOptions = {}): Blockquote {
  return {
    type,
    isSelectionInBlockquote: editor => isNodesTypeIn(editor, [type]),
    toggleBlockquote: editor => toggleNodesType(editor, type),
    with(editor) {
      const { normalizeNode } = editor;

      editor.normalizeNode = entry => {
        const [node] = entry;

        if (Element.isElement(node) && node.type === type) {
          if (normalizeOnlyInlineOrTextInChildren(editor, entry)) {
            return;
          }
        }

        normalizeNode(entry);
      };

      return editor;
    }
  };
}
