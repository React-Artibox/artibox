import { useSlate } from 'slate-react';
import { ReactBlockquote } from '../typings';

export function useBlockquoteTool(controller: ReactBlockquote) {
  const editor = useSlate();

  return {
    active: controller.isSelectionInBlockquote(editor),
    onClick: () => controller.toggleBlockquote(editor)
  };
}
