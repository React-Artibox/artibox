import { SchemaProperties } from 'slate';
import { LINK_DATA_KEY_URL } from './link.constants';
import { LinkController } from './link.interfaces';
import { isUrl } from './link.utils';

export function LinkSchema(type: string, linkController: LinkController): SchemaProperties {
  return {
    inlines: {
      [type]: {
        data: {
          [LINK_DATA_KEY_URL]: isUrl
        },
        normalize(editor, error) {
          if (error.code === 'node_data_invalid') {
            linkController.removeLinkInline(editor);
          }
        }
      }
    }
  };
}
