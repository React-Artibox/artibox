import { SchemaProperties } from 'slate';
import { VIDEO_PROVIDERS, youtubeEmbedReg } from './video.constants';

export type VideoSchemaRulesData = {
  [p in VIDEO_PROVIDERS]: (src: string) => boolean;
};

export function VideoSchema(type: string): SchemaProperties {
  const data: VideoSchemaRulesData = {
    youtube: src => youtubeEmbedReg.test(src)
  };

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
