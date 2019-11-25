import { useCallback } from 'react';
import { ToolHook } from '@artibox/slate-common';
import { LIST_TYPES, LIST_ORDERED_TYPES } from './list.constants';
import { ListController } from './list.controller';
import { ListHandlers } from './list.handlers';
import { ListRenderer } from './list.renderer';
import { ListSchema } from './list.schema';

export interface ListCreateConfig {
  types?: Partial<LIST_TYPES>;
}

export interface ListForToolHookConfig {
  orderedType: LIST_ORDERED_TYPES;
  action?: 'wrap' | 'unwrap' | 'toggle';
}

export class List extends ListController {
  static create(config?: ListCreateConfig) {
    const types = { ...LIST_TYPES, ...config?.types };
    return new this(types);
  }

  forPlugin() {
    const { types } = this;
    return {
      ...ListHandlers({ controller: this }),
      ...ListRenderer({ types }),
      schema: ListSchema({ types })
    } as const;
  }

  forToolHook(config: ListForToolHookConfig): ToolHook {
    const { orderedType, action = 'toggle' } = config;
    return editor => ({
      onMouseDown: useCallback(() => this[action](editor, orderedType), [editor])
    });
  }
}
