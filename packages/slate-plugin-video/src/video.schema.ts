import { SchemaProperties } from 'slate';
import { VIDEO_PROVIDERS } from './video.constants';
import { VideoSerializer, videoSerializers } from './video.serializers';

type VideoSchemaRulesDataValidator = (src?: string) => boolean;

function createVideoSchemaRulesDataValidator(serializer: VideoSerializer): VideoSchemaRulesDataValidator {
  const { reg } = serializer.deserialize;
  return src => typeof src === 'undefined' || reg.test(src);
}

export type VideoSchemaRulesData = {
  [p in VIDEO_PROVIDERS]: VideoSchemaRulesDataValidator;
};

const data: VideoSchemaRulesData = {
  youtube: createVideoSchemaRulesDataValidator(videoSerializers.youtube),
  vimeo: createVideoSchemaRulesDataValidator(videoSerializers.vimeo)
};

export function VideoSchema(type: string): SchemaProperties {
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
