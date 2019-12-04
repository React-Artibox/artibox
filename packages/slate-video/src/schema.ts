import { SchemaProperties } from 'slate';
import { NodeType } from '@artibox/slate-common';
import { VIDEO_PROVIDERS } from './constants';

const videoSourceDataValidator = (src?: string) => ['undefined', 'string'].includes(typeof src);

export type CreateVideoSchemaConfig = NodeType;

export function createVideoSchema(config: CreateVideoSchemaConfig): SchemaProperties {
  const { type } = config;

  return {
    blocks: {
      [type]: {
        isVoid: true,
        data: Object.keys(VIDEO_PROVIDERS).reduce((acc, provider) => {
          acc[provider] = videoSourceDataValidator;
          return acc;
        }, {} as any),
        normalize(editor, error) {
          if (error.code === 'node_data_invalid') {
            editor.removeNodeByKey(error.node.key);
          }
        }
      }
    }
  };
}
