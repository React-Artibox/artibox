import { PickPluginAndRequired } from '@artibox/slate-core';
import { LINK_TYPE, LINK_QUERY_HAS, LINK_COMMAND_REMOVE } from './link.constants';
import { LinkQueries } from './link.queries';
import { LinkCommands } from './link.commands';
import { LinkRendererConfig, LinkRenderer } from './link.renderer';
import { LinkSchema } from './link.schemta';

export interface LinkPluginConfig {
  type?: string;
  modal?: LinkRendererConfig['modal'];
}

export type LinkPlugin = LinkRenderer &
  PickPluginAndRequired<'schema'> & {
    queries: LinkQueries;
    commands: LinkCommands;
  };

export function LinkPlugin(config?: LinkPluginConfig): LinkPlugin {
  const type = config?.type ?? LINK_TYPE;
  const modal = config?.modal;
  const queries = LinkQueries(type);
  const commands = LinkCommands({ type, queryHas: queries[LINK_QUERY_HAS] });
  const renderer = LinkRenderer({ type, modal });
  const schema = LinkSchema({ type, commandRemove: commands[LINK_COMMAND_REMOVE] });

  return {
    queries,
    commands,
    ...renderer,
    schema
  };
}
