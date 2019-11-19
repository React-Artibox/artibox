import { PickPluginAndRequired } from '@artibox/slate-core';
import { CommonBlockRenderer } from '@artibox/slate-renderer';
import {
  INPUT_BLOCK_TYPE,
  INPUT_BLOCK_QUERY_CURRENT_BLOCK,
  INPUT_BLOCK_QUERY_IS_SELECTION_IN_INPUT_BLOCK,
  INPUT_BLOCK_COMMAND_END
} from './input-block.constants';
import { InputBlockQueries } from './input-block.queries';
import { InputBlockCommands } from './input-block.commands';
import { InputBlockHandlers } from './input-block.handlers';
import InputBlock from './input-block.component';
import { InputBlockSchema } from './input-block.schema';

export interface InputBlockPluginConfig {
  type?: string;
}

export interface InputBlockPlugin extends CommonBlockRenderer, InputBlockHandlers, PickPluginAndRequired<'schema'> {
  queries: InputBlockQueries;
  commands: InputBlockCommands;
}

export function InputBlockPlugin(config?: InputBlockPluginConfig): InputBlockPlugin {
  const type = config?.type ?? INPUT_BLOCK_TYPE;
  const queries = InputBlockQueries(type);
  const commands = InputBlockCommands({
    type,
    queryCurrentBlock: queries[INPUT_BLOCK_QUERY_CURRENT_BLOCK]
  });
  const handlers = InputBlockHandlers({
    queryIsSelectionInInputBlock: queries[INPUT_BLOCK_QUERY_IS_SELECTION_IN_INPUT_BLOCK],
    commandEnd: commands[INPUT_BLOCK_COMMAND_END]
  });
  const renderer = CommonBlockRenderer({
    type,
    getProps: props => ({ isEmpty: props.node.text === '' }),
    component: InputBlock
  });
  const schema = InputBlockSchema(type);

  return { queries, commands, ...handlers, ...renderer, schema };
}
