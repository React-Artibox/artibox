import { SchemaProperties } from 'slate';

export function InputBlockSchema(type: string): SchemaProperties {
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
