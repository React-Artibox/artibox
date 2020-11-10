import { useSlate } from 'slate-react';
import { HeadingLevel } from '@artibox/slate-common/heading';
import { ReactHeading } from '../typings';

export function useToggleHeadingTool<L extends HeadingLevel, VL extends L>(controller: ReactHeading<L>, level: VL) {
  const editor = useSlate();

  return {
    active: controller.isSelectionInHeading(editor, level),
    onClick: () => controller.toggleHeadingNodes(editor, level)
  };
}
