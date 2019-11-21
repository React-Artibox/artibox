import { ToggleMarkConfig, ToggleMark } from '@artibox/slate-toggle-mark';
import { UNDERLINE_TYPE, UNDERLINE_COMPONENT, UNDERLINE_HOTKEY } from './underline.constants';
import { UnderlineController } from './underline.interfaces';

export const UnderlineHandlers = ToggleMark.Handlers;
export const UnderlineRenderer = ToggleMark.Renderer;

export class Underline implements UnderlineController {
  static Handlers = UnderlineHandlers;
  static Renderer = UnderlineRenderer;

  static create(config?: Partial<ToggleMarkConfig>) {
    return new this(
      ToggleMark.create({
        type: UNDERLINE_TYPE,
        hotkey: UNDERLINE_HOTKEY,
        component: UNDERLINE_COMPONENT,
        ...config
      })
    );
  }

  plugin = this.toggleMark.plugin;

  constructor(private readonly toggleMark: ToggleMark) {}

  isUnderlineActive: UnderlineController['isUnderlineActive'] = this.toggleMark.isToggleMarkActive;

  addUnderlineMark: UnderlineController['addUnderlineMark'] = this.toggleMark.addToggleMark;

  removeUnderlineMark: UnderlineController['removeUnderlineMark'] = this.toggleMark.removeToggleMark;

  toggleUnderlineMark: UnderlineController['toggleUnderlineMark'] = this.toggleMark.toggleToggleMark;
}
