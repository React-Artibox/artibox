import { PickPluginAndRequired } from '@artibox/slate-core';
import {
  LIST_TYPES,
  LIST_QUERY_ITEM,
  LIST_QUERY_LIST,
  LIST_QUERY_PREVIOUS_ITEM,
  LIST_QUERY_CURRENT_ITEM,
  LIST_QUERY_IS_SELECTION_IN_LIST,
  LIST_COMMAND_INCREASE_ITEM_DEPTH,
  LIST_COMMAND_DECREASE_ITEM_DEPTH,
  LIST_COMMAND_DECREASE_ITEM_DEPTH_OR_UNWRAP_IF_NEED
} from './list.constants';
import { ListQueries } from './list.queries';
import { ListCommands } from './list.commands';
import { ListRenderer } from './list.renderer';
import { ListHandlers } from './list.handlers';
import { ListSchema } from './list.schema';

export interface ListPluginConfig {
  types?: Partial<LIST_TYPES>;
}

export interface ListPlugin extends ListHandlers, ListRenderer, PickPluginAndRequired<'schema'> {
  queries: ListQueries;
  commands: ListCommands;
}

export function ListPlugin(config?: ListPluginConfig): ListPlugin {
  const types = { ...LIST_TYPES, ...config?.types };
  const queries = ListQueries(types);
  const queryItem = queries[LIST_QUERY_ITEM];
  const queryList = queries[LIST_QUERY_LIST];
  const queryCurrentItem = queries[LIST_QUERY_CURRENT_ITEM];
  const commands = ListCommands({
    types,
    queryItem,
    queryList,
    queryPreviousItem: queries[LIST_QUERY_PREVIOUS_ITEM],
    queryCurrentItem
  });
  const handlers = ListHandlers({
    queryCurrentItem,
    queryIsSelectionInList: queries[LIST_QUERY_IS_SELECTION_IN_LIST],
    commandIncreaseItemDepth: commands[LIST_COMMAND_INCREASE_ITEM_DEPTH],
    commandDecreaseItemDepth: commands[LIST_COMMAND_DECREASE_ITEM_DEPTH],
    commandDecreaseItemDepthOrUnwrapIfNeed: commands[LIST_COMMAND_DECREASE_ITEM_DEPTH_OR_UNWRAP_IF_NEED]
  });
  const renderer = ListRenderer(types);
  const schema = ListSchema(types);

  return {
    queries,
    commands,
    ...handlers,
    ...renderer,
    schema
  };
}
