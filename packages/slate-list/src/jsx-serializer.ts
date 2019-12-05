import { BlockJSON } from 'slate';
import { createJsxSerializerRule } from '@artibox/slate-jsx-serializer/rule';
import { LIST_TYPES, LIST_COMPONENTS, LIST_TYPE_KEY_LIST } from './constants';
import { ListTypes, ListComponents } from './typings';

export type CreateListJsxSerializerRulesConfig = {
  types?: ListTypes;
  components?: ListComponents;
};

export function createListJsxSerializerRules(config?: CreateListJsxSerializerRulesConfig) {
  const types = { ...LIST_TYPES, ...config?.types };
  const components = { ...LIST_COMPONENTS, ...config?.components };
  return LIST_TYPE_KEY_LIST.map(key =>
    createJsxSerializerRule<BlockJSON>({ type: types[key], component: components[key] })
  );
}
