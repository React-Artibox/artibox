import { HasNodeType } from '@artibox/slate-common';
import { BLOCKQUOTE_TYPE, BLOCKQUOTE_HOTKEY } from './blockquote.constants';
import { BlockquoteController } from './blockquote.controller';
import { BlockquoteHandlersConfig, BlockquoteHandlers } from './blockquote.handlers';
import { BlockquoteRendererConfig, BlockquoteRenderer } from './blockquote.renderer';

export type BlockquoteCreateConfig = Partial<HasNodeType>;

export type BlockquoteForPluginConfig = Omit<
  BlockquoteHandlersConfig & BlockquoteRendererConfig,
  'type' | 'controller'
>;

export class Blockquote extends BlockquoteController {
  static create(config?: BlockquoteCreateConfig) {
    const { type = BLOCKQUOTE_TYPE } = config || {};
    return new this(type);
  }

  forPlugin(config?: BlockquoteForPluginConfig) {
    const { hotkey = BLOCKQUOTE_HOTKEY, component } = config || {};
    const { type } = this;

    return {
      ...BlockquoteHandlers({ hotkey, controller: this }),
      ...BlockquoteRenderer({ type, component })
    } as const;
  }
}
