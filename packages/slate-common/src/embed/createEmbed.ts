import { Element, Transforms } from 'slate';
import { normalizeVoidElementChildren } from '../normalizers/normalizeVoidElementChildren';
import { PARAGRAPH_TYPE } from '../paragraph';
import { EMBED_TYPE, EmbedElement, EmbedStrategies, serializeEmbedCode } from './common';
import { Embed } from './typings';

export interface CreateEmbedOptions<P extends string> {
  type?: string;
  strategies: EmbedStrategies<P>;
}

export function createEmbed<P extends string>(options: CreateEmbedOptions<P>): Embed<P> {
  const { type = EMBED_TYPE, strategies } = options;
  const insertEmbed: Embed<P>['insertEmbed'] = (editor, providers, embedCode, defaultNode = PARAGRAPH_TYPE) => {
    const result = serializeEmbedCode(embedCode, strategies, providers);

    if (result) {
      const [provider, data] = result;
      const embedElement: EmbedElement = { ...data, type, provider, children: [{ text: '' }] };

      Transforms.insertNodes(editor, [
        embedElement,
        typeof defaultNode === 'string' ? { type: defaultNode, children: [{ text: '' }] } : defaultNode
      ]);
      Transforms.move(editor);
    }
  };

  return {
    type,
    strategies,
    insertEmbed,
    with(editor) {
      const { isVoid, normalizeNode } = editor;

      editor.isVoid = element => element.type === type || isVoid(element);
      editor.normalizeNode = entry => {
        const [node, path] = entry;

        if (Element.isElement(node) && node.type === type) {
          const strategy = node.provider ? strategies[node.provider as P] : undefined;

          if (!strategy || !strategy.isElementDataValid(node)) {
            Transforms.removeNodes(editor, { at: path });
            return;
          }

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
