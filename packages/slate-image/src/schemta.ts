import { SchemaProperties } from 'slate';
import { NodeType } from '@artibox/slate-common';
import { WithThresholds } from './typings';

export type CreateImageSchemaConfig = NodeType & Partial<WithThresholds>;

export function createImageSchema(config: CreateImageSchemaConfig): SchemaProperties {
  const { type, thresholds } = config;

  return {
    inlines: {
      [type]: {
        isVoid: true,
        data: {
          src: (src?: string) => typeof src === 'string',
          width: (width?: string) =>
            typeof width === 'undefined' || (typeof width === 'number' && (!thresholds || thresholds.includes(width))),
          hoistingType: hoistingType => ['undefined', 'string'].includes(typeof hoistingType)
        },
        normalize(editor, error) {
          if (error.code === 'node_data_invalid') {
            editor.removeNodeByKey(error.node.key);
          }
        }
      }
    }
  };
}
