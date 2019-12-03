import { Editor, Block } from 'slate';
import { NodeType, InputConfig } from '@artibox/slate-common';

export interface InputBlockController {
  isSelectionIn(editor: Editor): boolean;
  getCurrent(editor: Editor): Block | null;
  start(editor: Editor, data: InputConfig): Editor;
  cancel(editor: Editor): Editor;
  confirm(editor: Editor): Editor;
}

export type CreateInputBlockContrllerConfig = NodeType;

export function createInputBlockContrller(config: CreateInputBlockContrllerConfig): InputBlockController {
  const { type } = config;
  const getCurrent: InputBlockController['getCurrent'] = editor => {
    const block = editor.value.startBlock;
    return block.type !== type ? null : block;
  };
  const isSelectionIn: InputBlockController['isSelectionIn'] = editor => !!getCurrent(editor);
  const start: InputBlockController['start'] = (editor, data) => {
    const { isExpanded } = editor.value.selection;
    const block = Block.fromJSON({ type, data });

    if (isExpanded) {
      editor.delete();
    }

    return editor.insertBlock(block);
  };
  const cancel: InputBlockController['cancel'] = editor => {
    const block = getCurrent(editor);
    return block ? editor.removeNodeByKey(block.key) : editor;
  };
  const confirm: InputBlockController['confirm'] = editor => {
    const block = getCurrent(editor);

    if (!block) {
      return editor;
    }

    const { text, data } = block;
    const onConfirm: InputConfig['onConfirm'] = data.get('onConfirm');
    return onConfirm(cancel(editor), text);
  };

  return {
    isSelectionIn,
    getCurrent,
    start,
    cancel,
    confirm
  };
}
