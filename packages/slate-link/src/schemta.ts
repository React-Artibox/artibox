import { SchemaProperties } from 'slate';
import { NodeType } from '@artibox/slate-common';
import { isUrl } from './utils/is-url';
import { LinkController } from './controller';

export interface CreateLinkSchemaConfig extends NodeType {
  controller: LinkController;
}

export function createLinkSchema(config: CreateLinkSchemaConfig): SchemaProperties {
  const { type, controller } = config;

  return {
    inlines: {
      [type]: {
        data: {
          href: isUrl
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
