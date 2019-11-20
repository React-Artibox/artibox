import { PickPluginAndRequired } from '@artibox/slate-core';
import { RendererBaseComponent } from '@artibox/slate-renderer';
import { INSTAGRAM_TYPE } from './instagram.constants';
import Instagram, { InstagramProps } from './instagram.component';
import { InstagramCommands } from './instagram.commands';
import { InstagramRenderer } from './instagram.renderer';
import { InstagramSchema } from './instagram.schema';

export interface InstagramPluginConfig {
  type?: string;
  component?: RendererBaseComponent<InstagramProps>;
}

export interface InstagramPlugin extends InstagramRenderer, PickPluginAndRequired<'schema'> {
  commands: InstagramCommands;
}

export function InstagramPlugin(config?: InstagramPluginConfig): InstagramPlugin {
  const type = config?.type ?? INSTAGRAM_TYPE;
  const component = config?.component ?? Instagram;
  const commands = InstagramCommands(type);
  const renderer = InstagramRenderer({ type, component });
  const schema = InstagramSchema(type);

  return {
    commands,
    ...renderer,
    schema
  };
}
