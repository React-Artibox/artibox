import { SchemaProperties } from 'slate';
import { HasNodeType } from '@artibox/slate-common';

export type InstagramSchemaConfig = HasNodeType;

export function InstagramSchema(config: InstagramSchemaConfig): SchemaProperties {
  const { type } = config;

  return {
    blocks: {
      [type]: {
        isVoid: true
      }
    }
  };
}
