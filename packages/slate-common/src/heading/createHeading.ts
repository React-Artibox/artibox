import { Element, Transforms } from 'slate';
import { getNodes } from '../queries/getNodes';
import { normalizeOnlyInlineOrTextInChildren } from '../normalizers/normalizeOnlyInlineOrTextInChildren';
import { PARAGRAPH_TYPE } from '../paragraph';
import { HEADING_TYPE, HEADING_LEVELS, HeadingElement, HeadingLevel } from './common';
import { Heading } from './typings';

export interface CreateHeadingOptions<L extends HeadingLevel> {
  type?: string;
  enabledLevels?: ReadonlyArray<L>;
}

export function createHeading<L extends HeadingLevel = HeadingLevel>({
  type = HEADING_TYPE,
  enabledLevels = HEADING_LEVELS as ReadonlyArray<L>
}: CreateHeadingOptions<L> = {}): Heading<L> {
  const getHeadingNodes: Heading<L>['getHeadingNodes'] = (editor, level, options = {}) =>
    getNodes(editor, {
      ...options,
      match: node => node.type === type && node.level === level
    });

  const isSelectionInHeading: Heading<L>['isSelectionInHeading'] = (editor, level, options = {}) => {
    const [match] = getHeadingNodes(editor, level, options);
    return !!match;
  };
  const toggleHeadingNodes: Heading<L>['toggleHeadingNodes'] = (editor, level, defaultType = PARAGRAPH_TYPE) => {
    if (enabledLevels.includes(level)) {
      const isActive = isSelectionInHeading(editor, level);
      const defaultNode = { type: defaultType };
      const heading: HeadingElement = { type, level, children: [] };
      const node = isActive ? defaultNode : heading;

      Transforms.setNodes(editor, node);
    } else {
      throw new Error(`Only ${enabledLevels} levels are enabled.`);
    }
  };

  return {
    type,
    enabledLevels,
    getHeadingNodes,
    isSelectionInHeading,
    toggleHeadingNodes,
    with(editor) {
      const { normalizeNode } = editor;

      editor.normalizeNode = entry => {
        const [node, path] = entry;

        if (Element.isElement(node) && node.type === type) {
          /**
           * Set invalid level elements to default.
           */
          if (!enabledLevels.includes(node.level as L)) {
            Transforms.setNodes(editor, { type: PARAGRAPH_TYPE }, { at: path });
            return;
          }

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
