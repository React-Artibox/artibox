import { useEditor } from 'slate-react';
import { ReactDivider } from '../typings';

export function useDividerTool(controller: ReactDivider) {
  const editor = useEditor();

  return {
    onClick: () => controller.insertDivider(editor)
  };
}
