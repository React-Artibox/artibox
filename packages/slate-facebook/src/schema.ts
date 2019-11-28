import { SchemaProperties } from 'slate';
import { NodeType } from '@artibox/slate-common';
import { FACEBOOK_EMBED_TYPES } from './constants';

export type CreateFacebookSchemaConfig = NodeType;

export function createFacebookSchema(config: CreateFacebookSchemaConfig): SchemaProperties {
  const { type } = config;

  return {
    blocks: {
      [type]: {
        isVoid: true,
        data: {
          type: embedType => FACEBOOK_EMBED_TYPES.includes(embedType),
          url: url => typeof url === 'string',
          width: width => ['undefined', 'number'].includes(typeof width),
          height: height => ['undefined', 'number'].includes(typeof height)
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
