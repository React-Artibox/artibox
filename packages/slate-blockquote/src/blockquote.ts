import { CommonBlockRenderer, RendererBaseComponent } from '@artibox/slate-renderer';
import { BlockquoteUtils } from './blockquote.utils';
import { BlockquoteHandlers } from './blockquote.handlers';
import { BLOCKQUOTE_TYPE, BLOCKQUOTE_HOTKEY, BLOCKQUOTE_COMPONENT } from './blockquote.constants';

export interface BlockquoteConfig {
  type: string;
  hotkey: string;
  component: RendererBaseComponent;
}

export class Blockquote {
  static create(config?: BlockquoteConfig) {
    const type = config?.type ?? BLOCKQUOTE_TYPE;
    const hotkey = config?.hotkey ?? BLOCKQUOTE_HOTKEY;
    const component = config?.component ?? BLOCKQUOTE_COMPONENT;
    const utils = BlockquoteUtils(type);
    const handlers = BlockquoteHandlers(hotkey, utils);
    const renderer = CommonBlockRenderer({ type, component });

    return new this(utils, handlers, renderer);
  }

  constructor(
    public readonly utils: BlockquoteUtils,
    private readonly handlers: BlockquoteHandlers,
    private readonly renderer: CommonBlockRenderer
  ) {}

  get plugin() {
    return { ...this.handlers, ...this.renderer };
  }
}
