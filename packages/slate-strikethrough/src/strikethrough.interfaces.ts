import { ToggleMarkController } from '@artibox/slate-toggle-mark';

export interface StrikethroughController {
  isStrikethroughActive: ToggleMarkController['isToggleMarkActive'];
  addStrikethroughMark: ToggleMarkController['addToggleMark'];
  removeStrikethroughMark: ToggleMarkController['removeToggleMark'];
  toggleStrikethroughMark: ToggleMarkController['toggleToggleMark'];
}
