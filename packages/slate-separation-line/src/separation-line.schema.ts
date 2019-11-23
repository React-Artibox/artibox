import { SchemaProperties } from 'slate';
import { HasNodeType } from '@artibox/slate-common';

export type SeparationLineSchemaConfig = HasNodeType;

export function SeparationLineSchema(config: SeparationLineSchemaConfig): SchemaProperties {
  const { type } = config;

  return {
    blocks: {
      [type]: {
        isVoid: true
      }
    }
  };
}
