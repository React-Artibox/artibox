import { SchemaProperties, Rules, Block } from 'slate';
import { PARAGRAPH_TYPE } from '@artibox/slate-common/constants/paragraph.constants';
import { LIST_TYPES } from './list.constants';

export interface ListSchemaConfig {
  types: LIST_TYPES;
}

export function ListSchema(config: ListSchemaConfig): SchemaProperties {
  const { types } = config;

  const listRules: Rules = {
    /**
     * There must be at least one item in each list.
     */
    nodes: [
      {
        match: { object: 'block', type: types.item },
        min: 1
      }
    ],

    normalize(editor, error) {
      /**
       * If there is no any item, remove the list.
       */
      if (error.code === 'child_min_invalid') {
        editor.removeNodeByKey(error.node.key);
      }
    }
  };
  const itemRules: Rules = {
    /**
     * The item must be wrapped by list.
     */
    parent: [{ type: types.unordered }, { type: types.ordered }],
    /**
     * There must be at least one `block` in each item.
     * The amount of list in the children of item must be no more than 1.
     */
    nodes: [
      {
        match: [{ object: 'block' }],
        min: 1
      },
      {
        match: [{ type: types.unordered }, { type: types.ordered }],
        max: 1
      }
    ],
    normalize(editor, error) {
      /**
       * If there is no any `block` in item, add default paragraph block on it.
       */
      if (error.code === 'child_min_invalid') {
        const paragraph = Block.fromJSON({ type: PARAGRAPH_TYPE });
        editor.insertNodeByKey(error.node.key, 0, paragraph);
        /**
         * If any children is not `block`, wrap it in default paragraph block.
         */
      } else if (error.code === 'child_object_invalid') {
        editor.wrapBlockByKey(error.child.key, { type: PARAGRAPH_TYPE });
        /**
         * If parent is not list, wrap it in unordered list.
         */
      } else if (error.code === 'parent_type_invalid') {
        editor.wrapBlockByKey(error.node.key, types.unordered);
      }
    }
  };

  return {
    blocks: {
      [types.unordered]: listRules,
      [types.ordered]: listRules,
      [types.item]: itemRules
    }
  };
}
