import { SchemaProperties, Rules, Block } from 'slate';
import { PARAGRAPH_TYPE } from '@artibox/slate-core';
import { LIST_TYPES } from './list.constants';

export function ListSchema(types: LIST_TYPES): SchemaProperties {
  const listRules: Rules = {
    nodes: [
      {
        match: { object: 'block', type: types.item },
        min: 1
      }
    ],
    normalize(editor, error) {
      if (error.code === 'child_min_invalid') {
        editor.removeNodeByKey(error.node.key);
      }
    }
  };

  return {
    blocks: {
      [types.unordered]: listRules,
      [types.ordered]: listRules,
      [types.item]: {
        parent: [{ type: types.unordered }, { type: types.ordered }],
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
          if (error.code === 'child_min_invalid') {
            const paragraph = Block.fromJSON({ type: PARAGRAPH_TYPE });
            editor.insertNodeByKey(error.node.key, 0, paragraph);
          } else if (error.code === 'child_object_invalid') {
            editor.wrapBlockByKey(error.child.key, { type: PARAGRAPH_TYPE });
          } else if (error.code === 'parent_type_invalid') {
            editor.wrapBlockByKey(error.node.key, types.unordered);
          }
        }
      }
    }
  };
}
