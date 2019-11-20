import { SchemaProperties } from 'slate';

export function InstagramSchema(type: string): SchemaProperties {
  return {
    blocks: {
      [type]: {
        isVoid: true
      }
    }
  };
}
