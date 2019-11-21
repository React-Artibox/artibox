import { ToggleMarkController } from '@artibox/slate-toggle-mark';

export interface BoldController {
  isBoldActive: ToggleMarkController['isToggleMarkActive'];
  addBoldMark: ToggleMarkController['addToggleMark'];
  removeBoldMark: ToggleMarkController['removeToggleMark'];
  toggleBoldMark: ToggleMarkController['toggleToggleMark'];
}
