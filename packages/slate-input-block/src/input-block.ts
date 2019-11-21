import { Block } from 'slate';
import { CommonBlockRenderer } from '@artibox/slate-renderer';
import { INPUT_BLOCK_TYPE, INPUT_BLOCK_DATA_KEY_ON_CONFIRM } from './input-block.constants';
import { InputBlockData } from './input-block.types';
import { InputBlockController } from './input-block.interfaces';
import { InputBlockHandlers } from './input-block.handlers';
import InputBlockComponent from './input-block.component';
import { InputBlockSchema } from './input-block.schema';

export interface InputBlockConfig {
  type?: string;
}

export class InputBlock implements InputBlockController {
  static Handlers = InputBlockHandlers;
  static Renderer = CommonBlockRenderer;
  static Schema = InputBlockSchema;

  static create(config?: InputBlockConfig) {
    const type = config?.type ?? INPUT_BLOCK_TYPE;

    return new this(
      type,
      this.Handlers,
      this.Renderer({
        type,
        getProps: props => ({ isEmpty: props.node.text === '' }),
        component: InputBlockComponent
      }),
      this.Schema(type)
    );
  }

  plugin = {
    ...this.handlersFactory(this),
    ...this.renderer,
    schema: this.schema
  } as const;

  constructor(
    public readonly type: string,
    private readonly handlersFactory: (inputBlockController: InputBlockController) => InputBlockHandlers,
    private readonly renderer: CommonBlockRenderer,
    private readonly schema: ReturnType<typeof InputBlockSchema>
  ) {}

  isSelectionInInputBlock: InputBlockController['isSelectionInInputBlock'] = editor =>
    !!this.getCurrentInputBlock(editor);

  getCurrentInputBlock: InputBlockController['getCurrentInputBlock'] = editor => {
    const block = editor.value.startBlock;
    return block.type !== this.type ? null : block;
  };

  startInputBlock: InputBlockController['startInputBlock'] = (editor, data) => {
    const { isExpanded } = editor.value.selection;
    const block = Block.fromJSON({ type: this.type, data });

    if (isExpanded) {
      editor.delete();
    }

    return editor.insertBlock(block);
  };

  cancelInputBlock: InputBlockController['cancelInputBlock'] = editor => {
    const block = this.getCurrentInputBlock(editor);
    return block ? editor.removeNodeByKey(block.key) : editor;
  };

  confirmInputBlock: InputBlockController['confirmInputBlock'] = editor => {
    const block = this.getCurrentInputBlock(editor);

    if (!block) {
      return editor;
    }

    const { text, data } = block;
    const onConfirm: InputBlockData[INPUT_BLOCK_DATA_KEY_ON_CONFIRM] = data.get(INPUT_BLOCK_DATA_KEY_ON_CONFIRM);
    return onConfirm(this.cancelInputBlock(editor), text);
  };
}
