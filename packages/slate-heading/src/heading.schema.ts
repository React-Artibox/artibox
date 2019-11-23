import { SchemaProperties } from 'slate';
import { PARAGRAPH_TYPE, HasNodeType } from '@artibox/slate-common';
import { HEADING_LEVELS, HEADING_DATA_KEY_LEVEL } from './heading.constants';
import { HeadingConfigEnabled } from './heading.interfaces';

export type HeadingSchemaConfig = HasNodeType & HeadingConfigEnabled;

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
