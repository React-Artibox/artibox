import { Block } from 'slate';
import { CommonBlockRenderer, RendererBaseComponent } from '@artibox/slate-renderer';
import { BLOCKQUOTE_TYPE, BLOCKQUOTE_HOTKEY, BLOCKQUOTE_COMPONENT } from './blockquote.constants';
import { BlockquoteHandlers } from './blockquote.handlers';
import { BlockquoteController } from './blockquote.interfaces';

export interface BlockquoteConfig {
  type: string;
  hotkey: string;
  component: RendererBaseComponent;
}

export class Blockquote implements BlockquoteController {
  static Handlers = BlockquoteHandlers;
  static Renderer = CommonBlockRenderer;

  static create(config?: BlockquoteConfig) {
    const type = config?.type ?? BLOCKQUOTE_TYPE;
    const hotkey = config?.hotkey ?? BLOCKQUOTE_HOTKEY;
    const component = config?.component ?? BLOCKQUOTE_COMPONENT;

    return new this(type, blockquote => this.Handlers(hotkey, blockquote), this.Renderer({ type, component }));
  }

  plugin = {
    ...this.handlersFactory(this),
    ...this.renderer
  } as const;

  constructor(
    public readonly type: string,
    private readonly handlersFactory: (blockquoteController: BlockquoteController) => BlockquoteHandlers,
    private readonly renderer: CommonBlockRenderer
  ) {}

  isBlockAsBlockquote: BlockquoteController['isBlockAsBlockquote'] = block => {
    if (!block) {
      return false;
    }

    return block.type === this.type;
  };

  isSelectionInBlockquote: BlockquoteController['isSelectionInBlockquote'] = editor =>
    !!this.getCurrentBlockquote(editor);

  getCurrentBlockquote: BlockquoteController['getCurrentBlockquote'] = editor => {
    const block = editor.value.startBlock as Block | null;

    if (!block) {
      return null;
    } else if (this.isBlockAsBlockquote(block)) {
      return block;
    }

    const parent = editor.value.document.getParent(block.key) as Block | null;
    return this.isBlockAsBlockquote(parent) ? parent : null;
  };

  wrapBlockquoteBlock: BlockquoteController['wrapBlockquoteBlock'] = editor => editor.wrapBlock(this.type);

  unwrapBlockquoteBlock: BlockquoteController['unwrapBlockquoteBlock'] = editor => editor.unwrapBlock(this.type);

  toggleBlockquoteBlock: BlockquoteController['toggleBlockquoteBlock'] = editor =>
    this.isSelectionInBlockquote(editor) ? this.unwrapBlockquoteBlock(editor) : this.wrapBlockquoteBlock(editor);
}
