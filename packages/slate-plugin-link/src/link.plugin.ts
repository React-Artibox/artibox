import { PickPluginAndRequired } from '@artibox/slate-core';
import { LINK_TYPE, LINK_QUERY_HAS, LINK_COMMAND_REMOVE } from './link.constants';
import { LinkQueries } from './link.queries';
import { LinkCommands } from './link.commands';
import { LinkRendererConfig, LinkRenderer } from './link.renderer';
import { LinkSchema } from './link.schemta';

export interface LinkPluginConfig {
  type?: string;
  renderLinkModal?: LinkRendererConfig['renderLinkModal'];
}

export interface LinkPlugin extends PickPluginAndRequired<'renderInline' | 'renderEditor' | 'schema'> {
  queries: LinkQueries;
  commands: LinkCommands;
}

export function LinkPlugin(config?: LinkPluginConfig): LinkPlugin {
  const type = config?.type ?? LINK_TYPE;
  const renderLinkModal = config?.renderLinkModal;
  const queries = LinkQueries(type);
  const commands = LinkCommands({ type, queryHas: queries[LINK_QUERY_HAS] });
  const renderer = LinkRenderer({ type, renderLinkModal });
  const schema = LinkSchema({ type, commandRemove: commands[LINK_COMMAND_REMOVE] });

  return {
    queries,
    commands,
    renderInline: renderer.renderInline,
    renderEditor: renderer.renderEditor,
    schema
  };
}
