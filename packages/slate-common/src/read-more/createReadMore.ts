import { Editor, Element, Path, Transforms } from 'slate';
import { normalizeOnlyAtRoot } from '../normalizers/normalizeOnlyAtRoot';
import { normalizeVoidElementChildren } from '../normalizers/normalizeVoidElementChildren';
import { getNodesByTypes } from '../queries/getNodesByTypes';
import { deleteSelectionFragmentIfExpanded } from '../transforms/deleteSelectionFragmentIfExpanded';
import { Paragraph } from '../paragraph';
import { READ_MORE_TYPE } from './common';
import { ReadMore } from './typings';

export interface CreateReadMoreOptions {
  type?: string;
}

export function createReadMore(options: CreateReadMoreOptions = {}): ReadMore {
  const { type = READ_MORE_TYPE } = options;
  const getReadMoresAtRoot = (editor: Editor) =>
    getNodesByTypes(editor, [type], {
      at: [],
      mode: 'highest'
    });
  const createReadMoreElement: ReadMore['createReadMoreElement'] = () => ({ type, children: [{ text: '' }] });
  const insertReadMore: ReadMore['insertReadMore'] = editor => {
    deleteSelectionFragmentIfExpanded(editor);

    const { selection } = editor;

    if (!selection) {
      return;
    }

    const [alreadyExistReadMore] = getReadMoresAtRoot(editor);

    if (!alreadyExistReadMore && selection.focus) {
      const at: Path = [selection.focus.path[0] + 1];

      Transforms.insertNodes(editor, [createReadMoreElement(), Paragraph.createParagraphElement()], {
        at
      });
      Transforms.select(editor, Path.next(at));
    }
  };

  return {
    type,
    createReadMoreElement,
    insertReadMore,
    with(editor) {
      const { isVoid, normalizeNode } = editor;

      editor.isVoid = element => element.type === type || isVoid(element);
      editor.normalizeNode = entry => {
        const [node, path] = entry;

        if (Element.isElement(node) && node.type === type) {
          if (normalizeVoidElementChildren(editor, [node, path]) || normalizeOnlyAtRoot(editor, entry)) {
            return;
          }

          /**
           * Only accept single read more element.
           */
          for (const [, readMorePath] of getReadMoresAtRoot(editor)) {
            if (Path.isAfter(path, readMorePath)) {
              Transforms.removeNodes(editor, { at: path });
              return;
            }
          }
        }

        normalizeNode(entry);
      };

      return editor;
    }
  };
}
