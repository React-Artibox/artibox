import { Block } from 'slate';
import { createJsxSerializerRule } from '@artibox/slate-jsx-serializer/rule';
import { LIST_TYPES, LIST_COMPONENTS } from './constants';

export type CreateListJsxSerializerRulesConfig = {
  types?: LIST_TYPES;
};

export function createListJsxSerializerRules(config?: CreateListJsxSerializerRulesConfig) {
  const types = { ...LIST_TYPES, ...config?.types };
  return (['unordered', 'ordered', 'item'] as Array<keyof LIST_TYPES>).map(type =>
    createJsxSerializerRule<Block>({ type: types[type], component: LIST_COMPONENTS[type] })
  );
}
