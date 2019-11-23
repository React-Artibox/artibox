import { SchemaProperties } from 'slate';
import { HasNodeType } from '@artibox/slate-common';

export type InputBlockSchemaConfig = HasNodeType;

export function InputBlockSchema(config: InputBlockSchemaConfig): SchemaProperties {
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
