import { useSlate } from 'slate-react';
import { ListRootTypeKey } from '@artibox/slate-common/list';
import { ReactList } from '../typings';

export function useListTool(controller: ReactList, listTypeKey: ListRootTypeKey) {
  const editor = useSlate();

  return {
    active: controller.isSelectionInList(editor, listTypeKey),
    onClick: () => controller.toggleList(editor, listTypeKey)
  };
}
