import { ToggleMarkController } from '@artibox/slate-toggle-mark';

export interface HighlightController {
  isHighlightActive: ToggleMarkController['isToggleMarkActive'];
  addHighlightMark: ToggleMarkController['addToggleMark'];
  removeHighlightMark: ToggleMarkController['removeToggleMark'];
  toggleHighlightMark: ToggleMarkController['toggleToggleMark'];
}
