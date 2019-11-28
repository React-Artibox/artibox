import { SchemaProperties } from 'slate';
import { LINK_DATA_KEY_HREF } from './link.constants';
import { isUrl } from './link.utils';
import { LinkController } from './link.controller';

export interface LinkSchemaConfig {
  controller: LinkController;
}

export function LinkSchema(config: LinkSchemaConfig): SchemaProperties {
  const { controller } = config;
  const { type } = controller;

  return {
    inlines: {
      [type]: {
        data: {
          [LINK_DATA_KEY_HREF]: isUrl
        },
        normalize(editor, error) {
          if (error.code === 'node_data_invalid') {
            controller.remove(editor);
          }
        }
      }
    }
  };
}
