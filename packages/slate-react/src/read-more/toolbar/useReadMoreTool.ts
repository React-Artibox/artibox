import { useEditor } from 'slate-react';
import { ReactReadMore } from '../typings';

export function useReadMoreTool(controller: ReactReadMore) {
  const editor = useEditor();

  return {
    onClick: () => controller.insertReadMore(editor)
  };
}
