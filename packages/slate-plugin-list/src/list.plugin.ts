import {
  LIST_TYPES,
  LIST_QUERY_LIST,
  LIST_QUERY_LIST_ITEM,
  LIST_QUERY_IN_LIST,
  LIST_COMMAND_UNWRAP,
  LIST_COMMAND_INCREASE_ITEM_DEPTH,
  LIST_COMMAND_DECREASE_ITEM_DEPTH
} from './list.constants';
import { ListQueries } from './list.queries';
import { ListCommands } from './list.commands';
import { ListRenderer } from './list.renderer';
import { ListHandlers } from './list.handlers';

export interface ListPluginConfig {
  types?: Partial<LIST_TYPES>;
}

export interface ListPlugin extends ListHandlers, ListRenderer {
  queries: ListQueries;
  commands: ListCommands;
}

export function ListPlugin(config?: ListPluginConfig): ListPlugin {
  const types = { ...LIST_TYPES, ...config?.types };
  const queries = ListQueries(types);
  const commands = ListCommands({ types });
  const handlers = ListHandlers({
    queryList: queries[LIST_QUERY_LIST],
    queryListItem: queries[LIST_QUERY_LIST_ITEM],
    queryInList: queries[LIST_QUERY_IN_LIST],
    commandUnwrap: commands[LIST_COMMAND_UNWRAP],
    commandIncreaseItemDepth: commands[LIST_COMMAND_INCREASE_ITEM_DEPTH],
    commandDecreaseItemDepth: commands[LIST_COMMAND_DECREASE_ITEM_DEPTH]
  });
  const renderer = ListRenderer(types);

  return {
    queries,
    commands,
    ...handlers,
    ...renderer
  };
}
