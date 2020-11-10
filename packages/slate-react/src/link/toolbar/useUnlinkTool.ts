import { useEditor } from 'slate-react';
import { ReactLink } from '../typings';

export function useUnlinkTool(controller: ReactLink) {
  const editor = useEditor();

  return {
    onClick: () => controller.unwrapLink(editor)
  };
}
