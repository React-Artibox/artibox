import { ReactHTML, ComponentType } from 'react';
import { RenderAttributes } from 'slate-react';

export type LIST_ORDERED_TYPES = 'ordered' | 'unordered';
export type LIST_TYPES = {
  [t in LIST_ORDERED_TYPES | 'item']: string;
};
export const LIST_TYPES = {
  ordered: 'ordered list',
  unordered: 'unordered list',
  item: 'list item'
} as const;

export type LIST_COMPONENTS = {
  [k in keyof LIST_TYPES]: keyof ReactHTML | ComponentType<RenderAttributes>;
};
export const LIST_COMPONENTS = {
  ordered: 'ol',
  unordered: 'ul',
  item: 'li'
} as const;

export const LIST_QUERY_ITEM = 'Query[List] Item' as const;
export type LIST_QUERY_ITEM = typeof LIST_QUERY_ITEM;
export const LIST_QUERY_LIST = 'Query[List] List' as const;
export type LIST_QUERY_LIST = typeof LIST_QUERY_LIST;
export const LIST_QUERY_PREVIOUS_ITEM = 'Query[List] Previous Item' as const;
export type LIST_QUERY_PREVIOUS_ITEM = typeof LIST_QUERY_PREVIOUS_ITEM;
export const LIST_QUERY_CURRENT_ITEM = 'Query[List] Current Item' as const;
export type LIST_QUERY_CURRENT_ITEM = typeof LIST_QUERY_CURRENT_ITEM;
export const LIST_QUERY_CURRENT_LIST = 'Query[List] Current List' as const;
export type LIST_QUERY_CURRENT_LIST = typeof LIST_QUERY_CURRENT_LIST;
export const LIST_QUERY_IS_SELECTION_IN_LIST = 'Query[List] Is Selection In List' as const;
export type LIST_QUERY_IS_SELECTION_IN_LIST = typeof LIST_QUERY_IS_SELECTION_IN_LIST;

export const LIST_COMMAND_WRAP = 'Command[List] Wrap' as const;
export type LIST_COMMAND_WRAP = typeof LIST_COMMAND_WRAP;
export const LIST_COMMAND_UNWRAP = 'Command[List] Unwrap' as const;
export type LIST_COMMAND_UNWRAP = typeof LIST_COMMAND_UNWRAP;
export const LIST_COMMAND_TOGGLE = 'Command[List] Toggle' as const;
export type LIST_COMMAND_TOGGLE = typeof LIST_COMMAND_TOGGLE;
export const LIST_COMMAND_INCREASE_ITEM_DEPTH = 'Command[List] Increase Item Depth' as const;
export type LIST_COMMAND_INCREASE_ITEM_DEPTH = typeof LIST_COMMAND_INCREASE_ITEM_DEPTH;
export const LIST_COMMAND_DECREASE_ITEM_DEPTH = 'Command[List] Decrease Item Depth' as const;
export type LIST_COMMAND_DECREASE_ITEM_DEPTH = typeof LIST_COMMAND_DECREASE_ITEM_DEPTH;
export const LIST_COMMAND_DECREASE_ITEM_DEPTH_OR_UNWRAP_IF_NEED = 'Command[List] Decrease Item Depth Or Unwrap If Need' as const;
export type LIST_COMMAND_DECREASE_ITEM_DEPTH_OR_UNWRAP_IF_NEED = typeof LIST_COMMAND_DECREASE_ITEM_DEPTH_OR_UNWRAP_IF_NEED;
