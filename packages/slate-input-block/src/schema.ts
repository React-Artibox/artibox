import { SchemaProperties } from 'slate';
import { NodeType } from '@artibox/slate-common';

export type CreateInputBlockSchemaConfig = NodeType;

/**
 * The input block is an editor util plugin, it's only support to input text in it.
 * So there are no any marks and there is only one text in nodes.
 */
export function createInputBlockSchema(config: CreateInputBlockSchemaConfig): SchemaProperties {
  const { type } = config;
  return {
    blocks: {
      [type]: {
        nodes: [
          {
            match: [{ object: 'text' }],
            max: 1
          }
        ],
        marks: [{ type: () => false }]
      }
    }
  };
}
