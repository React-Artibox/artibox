import { useSlate } from 'slate-react';
import { HeadingLevel } from '@artibox/slate-common/heading';
import { ReactHeading } from '../typings';

export function useToggleHeadingTool<Level extends HeadingLevel, ValidLevel extends Level>(
  controller: ReactHeading<Level>,
  level: ValidLevel
) {
  const editor = useSlate();

  return {
    active: controller.isSelectionInHeading(editor, level),
    onClick: () => controller.toggleHeadingNodes(editor, level)
  };
}
