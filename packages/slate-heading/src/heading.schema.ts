import { SchemaProperties } from 'slate';
import { HasNodeType } from '@artibox/slate-common';
import { PARAGRAPH_TYPE } from '@artibox/slate-common/constants/paragraph.constants';
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
