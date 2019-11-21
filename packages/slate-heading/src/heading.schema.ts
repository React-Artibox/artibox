import { SchemaProperties } from 'slate';
import { PARAGRAPH_TYPE } from '@artibox/slate-common';
import { HEADING_LEVELS, HEADING_DATA_KEY_LEVEL } from './heading.constants';

export interface HeadingSchemaConfig {
  type: string;
  enabled: HEADING_LEVELS[];
}

export function HeadingSchema(config: HeadingSchemaConfig): SchemaProperties {
  const { type, enabled } = config;

  return {
    blocks: {
      [type]: {
        data: {
          [HEADING_DATA_KEY_LEVEL]: (level: HEADING_LEVELS) => enabled.includes(level)
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
