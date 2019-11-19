import { PickPluginAndRequired } from '@artibox/slate-core';
import { RendererBaseComponent } from '@artibox/slate-renderer';
import { FACEBOOK_TYPE } from './facebook.constants';
import Facebook, { FacebookProps } from './facebook.component';
import { FacebookCommands } from './facebook.commands';
import { FacebookRenderer } from './facebook.renderer';
import { FacebookSchema } from './facebook.schema';

export interface FacebookPluginConfig {
  type?: string;
  component?: RendererBaseComponent<FacebookProps>;
}

export interface FacebookPlugin extends FacebookRenderer, PickPluginAndRequired<'schema'> {
  commands: FacebookCommands;
}

export function FacebookPlugin(config?: FacebookPluginConfig): FacebookPlugin {
  const type = config?.type ?? FACEBOOK_TYPE;
  const component = config?.component ?? Facebook;
  const commands = FacebookCommands(type);
  const renderer = FacebookRenderer({ type, component });
  const schema = FacebookSchema(type);

  return {
    commands,
    ...renderer,
    schema
  };
}
