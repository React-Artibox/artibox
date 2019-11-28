import { createCommonBlockRenderer } from '@artibox/slate-common/renderers/common-block';
import { LIST_TYPES, LIST_COMPONENTS } from './constants';

export interface CreateListRendererConfig {
  types?: LIST_TYPES;
}

export function createListRenderers(config?: CreateListRendererConfig) {
  const types = { ...LIST_TYPES, ...config?.types };
  const componentMap = {
    [types.unordered]: LIST_COMPONENTS.unordered,
    [types.ordered]: LIST_COMPONENTS.ordered,
    [types.item]: LIST_COMPONENTS.item
  };
  return [types.unordered, types.ordered, types.item].map(type =>
    createCommonBlockRenderer({
      type,
      component: componentMap[type]
    })
  );
}
