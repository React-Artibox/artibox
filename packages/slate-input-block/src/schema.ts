import { SchemaProperties } from 'slate';
import { NodeType } from '@artibox/slate-common';

export type CreateInputBlockSchemaConfig = NodeType;

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
