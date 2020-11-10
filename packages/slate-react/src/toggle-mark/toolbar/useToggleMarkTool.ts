import { useSlate } from 'slate-react';
import { ReactToggleMark } from '../typings';

export function useToggleMarkTool(controller: ReactToggleMark) {
  const editor = useSlate();

  return {
    active: controller.isToggleMarkActive(editor),
    onClick: () => controller.toggleMark(editor)
  };
}
