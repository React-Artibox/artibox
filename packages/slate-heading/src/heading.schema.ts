import { SchemaProperties } from 'slate';
import { HasNodeType } from '@artibox/slate-common';
import { PARAGRAPH_TYPE } from '@artibox/slate-common/constants/paragraph.constants';
import { HEADING_DATA_KEY_LEVEL } from './heading.constants';
import { HeadingLevel, HeadingConfigEnabled } from './heading.types';

export type HeadingSchemaConfig = HasNodeType & HeadingConfigEnabled;

export function HeadingSchema(config: HeadingSchemaConfig): SchemaProperties {
  const { type, enabled } = config;

  return {
    blocks: {
      [type]: {
        data: {
          [HEADING_DATA_KEY_LEVEL]: (level: HeadingLevel) => enabled.includes(level)
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
