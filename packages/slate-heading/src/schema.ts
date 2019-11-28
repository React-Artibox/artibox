import { SchemaProperties } from 'slate';
import { NodeType } from '@artibox/slate-common';
import { PARAGRAPH_TYPE } from '@artibox/slate-common/constants/paragraph';
import { HeadingLevel, HeadingConfigEnabled } from './types';

export type CreateHeadingSchemaConfig = NodeType & HeadingConfigEnabled;

export function createHeadingSchema(config: CreateHeadingSchemaConfig): SchemaProperties {
  const { type, enabled } = config;

  return {
    blocks: {
      [type]: {
        data: {
          level: (level: HeadingLevel) => enabled.includes(level)
        },
        normalize: (editor, error) => {
          if (error.code === 'node_data_invalid') {
            editor.setNodeByKey(error.node.key, PARAGRAPH_TYPE);
          }
        }
      }
    }
  };
}
