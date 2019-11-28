import { useCallback } from 'react';
import { ToolHook, ForPlugin, ForToolHook } from '@artibox/slate-common';
import { LIST_TYPES, LIST_ORDERED_TYPES } from './constants';
import { ListController, createListController } from './controller';
import { createListHandlers } from './handlers';
import { createListRenderers } from './renderers';
import { createListSchema } from './schema';

export interface ListForToolHookConfig {
  orderedType: LIST_ORDERED_TYPES;
  action?: 'wrap' | 'unwrap' | 'toggle';
}

export interface List extends ListController, ForPlugin<undefined, true>, ForToolHook<ListForToolHookConfig> {
  types: LIST_TYPES;
}

export interface CreateListConfig {
  types?: Partial<LIST_TYPES>;
}

export function createList(config?: CreateListConfig): List {
  const types = { ...LIST_TYPES, ...config?.types };
  const controller = createListController({ types });
  return {
    types,
    ...controller,
    forPlugin() {
      return [
        {
          ...createListHandlers({ controller }),
          schema: createListSchema({ types })
        },
        ...createListRenderers({ types })
      ];
    },
    forToolHook(config: ListForToolHookConfig): ToolHook {
      const { orderedType, action = 'toggle' } = config;
      return editor => ({
        onMouseDown: useCallback(() => controller[action](editor, orderedType), [editor])
      });
    }
  };
}
