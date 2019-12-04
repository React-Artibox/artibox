import { ListTypeKey } from './typings';

/**
 * Default types of list.
 */
export const LIST_TYPES = {
  ordered: 'ordered_list',
  unordered: 'unordered_list',
  item: 'list_item'
} as const;

export const LIST_TYPE_KEY_LIST: ListTypeKey[] = ['unordered', 'ordered', 'item'];

/**
 * Default components of list.
 */
export const LIST_COMPONENTS = {
  ordered: 'ol',
  unordered: 'ul',
  item: 'li'
} as const;
