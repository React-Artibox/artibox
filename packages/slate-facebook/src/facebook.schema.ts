import { SchemaProperties } from 'slate';
import {
  FACEBOOK_EMBED_TYPES,
  FACEBOOK_DATA_KEY_TYPE,
  FACEBOOK_DATA_KEY_URL,
  FACEBOOK_DATA_KEY_WIDTH,
  FACEBOOK_DATA_KEY_HEIGHT
} from './facebook.constants';

export function FacebookSchema(type: string): SchemaProperties {
  return {
    blocks: {
      [type]: {
        isVoid: true,
        data: {
          [FACEBOOK_DATA_KEY_TYPE]: embedType => FACEBOOK_EMBED_TYPES.includes(embedType),
          [FACEBOOK_DATA_KEY_URL]: url => typeof url === 'string',
          [FACEBOOK_DATA_KEY_WIDTH]: width => ['undefined', 'number'].includes(typeof width),
          [FACEBOOK_DATA_KEY_HEIGHT]: height => ['undefined', 'number'].includes(typeof height)
        },
        normalize: (editor, error) => {
          if (error.code === 'node_data_invalid') {
            editor.removeNodeByKey(error.node.key);
          }
        }
      }
    }
  };
}
