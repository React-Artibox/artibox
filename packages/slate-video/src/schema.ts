import { SchemaProperties } from 'slate';
import { NodeType } from '@artibox/slate-common';
import { VIDEO_PROVIDERS } from './constants';
import { VideoSourceSerializer, videoSourceSerializers } from './source-serializers';

type VideoSchemaRulesDataValidator = (src?: string) => boolean;

function createVideoSchemaRulesDataValidator(serializer: VideoSourceSerializer): VideoSchemaRulesDataValidator {
  const { reg } = serializer.deserialize;
  return src => typeof src === 'undefined' || reg.test(src);
}

export type VideoSchemaRulesData = {
  [p in VIDEO_PROVIDERS]: VideoSchemaRulesDataValidator;
};

const data: VideoSchemaRulesData = {
  youtube: createVideoSchemaRulesDataValidator(videoSourceSerializers.youtube),
  vimeo: createVideoSchemaRulesDataValidator(videoSourceSerializers.vimeo)
};

export type CreateVideoSchemaConfig = NodeType;

export function createVideoSchema(config: CreateVideoSchemaConfig): SchemaProperties {
  const { type } = config;

  return {
    blocks: {
      [type]: {
        isVoid: true,
        data,
        normalize: (editor, error) => {
          if (error.code === 'node_data_invalid') {
            editor.removeNodeByKey(error.node.key);
          }
        }
      }
    }
  };
}
