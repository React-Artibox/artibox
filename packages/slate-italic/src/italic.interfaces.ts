import { ToggleMarkController } from '@artibox/slate-toggle-mark';

export interface ItalicController {
  isItalicActive: ToggleMarkController['isToggleMarkActive'];
  addItalicMark: ToggleMarkController['addToggleMark'];
  removeItalicMark: ToggleMarkController['removeToggleMark'];
  toggleItalicMark: ToggleMarkController['toggleToggleMark'];
}
