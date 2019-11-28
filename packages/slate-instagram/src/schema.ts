import { SchemaProperties } from 'slate';
import { NodeType } from '@artibox/slate-common';

export type CreateInstagramSchemaConfig = NodeType;

export function createInstagramSchema(config: CreateInstagramSchemaConfig): SchemaProperties {
  const { type } = config;
  return {
    blocks: {
      [type]: {
        isVoid: true
      }
    }
  };
}
