import { SchemaProperties } from 'slate';
import { LINK_DATA_KEY_URL } from './link.constants';
import { LinkCommandRemove } from './link.commands';
import { isUrl } from './link.utils';

export interface LinkSchemaConfig {
  type: string;
  commandRemove: LinkCommandRemove;
}

export function LinkSchema(config: LinkSchemaConfig): SchemaProperties {
  const { type, commandRemove } = config;

  return {
    inlines: {
      [type]: {
        data: {
          [LINK_DATA_KEY_URL]: isUrl
        },
        normalize(editor, error) {
          if (error.code === 'node_data_invalid') {
            commandRemove(editor);
          }
        }
      }
    }
  };
}
