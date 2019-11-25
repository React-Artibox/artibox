import { Editor, Block } from 'slate';
import { HasNodeType } from '@artibox/slate-common';
import { InputBlockData } from './input-block.types';

export abstract class InputBlockController implements HasNodeType {
  constructor(public readonly type: string) {}

  isSelectionIn = (editor: Editor): boolean => !!this.getCurrent(editor);

  getCurrent = (editor: Editor): Block | null => {
    const block = editor.value.startBlock;
    return block.type !== this.type ? null : block;
  };

  start = (editor: Editor, data: InputBlockData): Editor => {
    const { isExpanded } = editor.value.selection;
    const block = Block.fromJSON({ type: this.type, data });

    if (isExpanded) {
      editor.delete();
    }

    return editor.insertBlock(block);
  };

  cancel = (editor: Editor): Editor => {
    const block = this.getCurrent(editor);
    return block ? editor.removeNodeByKey(block.key) : editor;
  };

  confirm = (editor: Editor): Editor => {
    const block = this.getCurrent(editor);

    if (!block) {
      return editor;
    }

    const { text, data } = block;
    const onConfirm: InputBlockData['onConfirm'] = data.get('onConfirm');
    return onConfirm(this.cancel(editor), text);
  };
}
