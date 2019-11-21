import { ToggleMarkConfig, ToggleMark } from '@artibox/slate-toggle-mark';
import { ITALIC_TYPE, ITALIC_COMPONENT, ITALIC_HOTKEY } from './italic.constants';
import { ItalicController } from './italic.interfaces';

export const ItalicHandlers = ToggleMark.Handlers;
export const ItalicRenderer = ToggleMark.Renderer;

export class Italic implements ItalicController {
  static Handlers = ItalicHandlers;
  static Renderer = ItalicRenderer;

  static create(config?: Partial<ToggleMarkConfig>) {
    return new this(
      ToggleMark.create({
        type: ITALIC_TYPE,
        hotkey: ITALIC_HOTKEY,
        component: ITALIC_COMPONENT,
        ...config
      })
    );
  }

  plugin = this.toggleMark.plugin;

  constructor(private readonly toggleMark: ToggleMark) {}

  isItalicActive: ItalicController['isItalicActive'] = this.toggleMark.isToggleMarkActive;

  addItalicMark: ItalicController['addItalicMark'] = this.toggleMark.addToggleMark;

  removeItalicMark: ItalicController['removeItalicMark'] = this.toggleMark.removeToggleMark;

  toggleItalicMark: ItalicController['toggleItalicMark'] = this.toggleMark.toggleToggleMark;
}
