import { SchemaProperties } from 'slate';

export function SeparationLineSchema(type: string): SchemaProperties {
  return {
    blocks: {
      [type]: {
        isVoid: true
      }
    }
  };
}
