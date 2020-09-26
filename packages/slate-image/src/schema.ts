import { SchemaProperties } from 'slate';
import { WithThresholds, ImageTypes } from './typings';

export interface CreateImageSchemaConfig extends Partial<WithThresholds> {
  types: ImageTypes;
}

export function createImageSchema(config: CreateImageSchemaConfig): SchemaProperties {
  const { types, thresholds } = config;

  return {
    blocks: {
      [types.figure]: {
        first: { object: 'block', type: types.image },
        last: { object: 'block', type: types.caption },
        nodes: [
          {
            match: { object: 'block', type: types.image },
            min: 1,
            max: 1
          },
          {
            match: { object: 'block', type: types.caption },
            min: 1,
            max: 1
          }
        ],
        normalize(editor, error) {
          editor.removeNodeByKey(error.node.key);
        }
      },
      [types.image]: {
        isVoid: true,
        data: {
          src: (src?: unknown) => typeof src === 'string',
          width: (width?: unknown) =>
            typeof width === 'undefined' || (typeof width === 'number' && (!thresholds || thresholds.includes(width))),
          hoistingType: (hoistingType?: unknown) => ['undefined', 'string'].includes(typeof hoistingType)
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
