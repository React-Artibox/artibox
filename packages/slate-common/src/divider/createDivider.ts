import { Element, Transforms } from 'slate';
import { WithElementType } from '../typings/element';
import { normalizeVoidElementChildren } from '../normalizers/normalizeVoidElementChildren';
import { Paragraph } from '../paragraph';
import { DIVIDER_TYPE } from './common';
import { Divider } from './typings';

export type CreateDividerOptions = Partial<WithElementType>;

export function createDivider(options: CreateDividerOptions = {}): Divider {
  const { type = DIVIDER_TYPE } = options;
  const createDividerElement: Divider['createDividerElement'] = () => ({ type, children: [{ text: '' }] });
  const insertDivider: Divider['insertDivider'] = editor => {
    Transforms.insertNodes(editor, [createDividerElement(), Paragraph.createParagraphElement()]);
    Transforms.move(editor);
  };

  return {
    type,
    createDividerElement,
    insertDivider,
    with(editor) {
      const { isVoid, normalizeNode } = editor;

      editor.isVoid = element => element.type === type || isVoid(element);
      editor.normalizeNode = entry => {
        const [node, path] = entry;

        /**
         * Only accept single empty text inside void element.
         */
        if (Element.isElement(node) && node.type === type) {
          if (normalizeVoidElementChildren(editor, [node, path])) {
            return;
          }
        }

        normalizeNode(entry);
      };

      return editor;
    }
  };
}
