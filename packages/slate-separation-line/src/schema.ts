import { SchemaProperties } from 'slate';
import { NodeType } from '@artibox/slate-common';

export type CreateSeparationLineSchemaConfig = NodeType;

export function createSeparationLineSchema(config: CreateSeparationLineSchemaConfig): SchemaProperties {
  const { type } = config;
  return {
    blocks: {
      [type]: {
        isVoid: true
      }
    }
  };
}
