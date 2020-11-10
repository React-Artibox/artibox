import { createList, CreateListOptions, ListTypeKey } from '@artibox/slate-common/list';
import { createRenderElements } from '../core';
import { defaultRenderListElements } from './defaultRenderListElements';
import { ReactList } from './typings';

export type CreateReactListOptions = CreateListOptions;

export function createReactList(options: CreateReactListOptions = {}): ReactList {
  const core = createList(options);

  return {
    ...core,
    createRenderElement: (options = {}) =>
      createRenderElements(
        (['ol', 'ul', 'li'] as ListTypeKey[]).map(key => ({
          type: core.types[key],
          render: options[key] || defaultRenderListElements[key]
        }))
      ),
    createHandlers: () => ({
      onKeyDown: (event, editor, next) => {
        if (event.key === 'Tab') {
          const entries = core.getAboveListAndItem(editor);

          if (entries) {
            event.preventDefault();
            (event.shiftKey ? core.decreaseListItemDepth : core.increaseListItemDepth)(editor, entries);
            return;
          }
        }

        next();
      }
    })
  };
}
