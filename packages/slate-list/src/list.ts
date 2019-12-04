import { useCallback } from 'react';
import { ToolHook, ForPlugin, ForToolHook } from '@artibox/slate-common';
import { LIST_TYPES, LIST_COMPONENTS } from './constants';
import { ListOrderedTypeKey, ListTypes } from './typings';
import { ListController, createListController } from './controller';
import { createListHandlers } from './handlers';
import { CreateListRendererConfig, createListRenderers } from './renderers';
import { createListSchema } from './schema';

export interface ListForToolHookConfig {
  /**
   * The command of controller of list will be triggered after clicked.
   */
  command?: 'wrap' | 'unwrap' | 'toggle';
  orderedType: ListOrderedTypeKey;
}

export interface List extends ListController, ForPlugin<undefined, true>, ForToolHook<ListForToolHookConfig> {
  types: ListTypes;
}

export interface CreateListConfig {
  types?: Partial<CreateListRendererConfig['types']>;
  components?: Partial<CreateListRendererConfig['components']>;
}

export function createList(config?: CreateListConfig): List {
  const types = { ...LIST_TYPES, ...config?.types };
  const components = { ...LIST_COMPONENTS, ...config?.components };
  const controller = createListController({ types });
  return {
    types,
    ...controller,
    forPlugin: () => [
      {
        ...createListHandlers({ controller }),
        schema: createListSchema({ types })
      },
      ...createListRenderers({ types, components })
    ],
    forToolHook(config: ListForToolHookConfig): ToolHook {
      const { orderedType, command = 'toggle' } = config;
      return editor => ({
        onMouseDown: useCallback(() => controller[command](editor, orderedType), [editor])
      });
    }
  };
}
