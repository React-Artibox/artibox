import { ToggleMarkController } from '@artibox/slate-toggle-mark';

export interface UnderlineController {
  isUnderlineActive: ToggleMarkController['isToggleMarkActive'];
  addUnderlineMark: ToggleMarkController['addToggleMark'];
  removeUnderlineMark: ToggleMarkController['removeToggleMark'];
  toggleUnderlineMark: ToggleMarkController['toggleToggleMark'];
}
