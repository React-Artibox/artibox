import { createCommonBlockRenderer } from '@artibox/slate-common/renderers/common-block';
import { LIST_TYPE_KEY_LIST } from './constants';
import { ListTypes, ListComponents } from './typings';

export interface CreateListRendererConfig {
  types: ListTypes;
  components: ListComponents;
}

export function createListRenderers(config: CreateListRendererConfig) {
  const { types, components } = config;
  return LIST_TYPE_KEY_LIST.map(key =>
    createCommonBlockRenderer({
      type: types[key],
      component: components[key]
    })
  );
}
