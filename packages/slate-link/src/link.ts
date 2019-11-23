import { HasNodeType } from '@artibox/slate-common';
import { LINK_TYPE } from './link.constants';
import { LinkController } from './link.controller';
import { LinkRendererConfig, LinkRenderer } from './link.renderer';
import { LinkSchema } from './link.schemta';

export type LinkCreateConfig = Partial<HasNodeType>;

export type LinkForPluginConfig = LinkRendererConfig;

export class Link extends LinkController {
  static create(config?: LinkCreateConfig) {
    const { type = LINK_TYPE } = config || {};
    return new this(type);
  }

  forPlugin(config?: LinkForPluginConfig) {
    const { type } = this;
    const { renderModal } = config || {};
    return {
      ...LinkRenderer({ type, renderModal }),
      schema: LinkSchema({ controller: this })
    } as const;
  }
}
