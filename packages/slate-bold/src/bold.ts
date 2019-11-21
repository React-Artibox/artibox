import { ToggleMarkConfig, ToggleMark } from '@artibox/slate-toggle-mark';
import { BOLD_TYPE, BOLD_COMPONENT, BOLD_HOTKEY } from './bold.constants';
import { BoldController } from './bold.interfaces';

export const BoldHandlers = ToggleMark.Handlers;
export const BoldRenderer = ToggleMark.Renderer;

export class Bold implements BoldController {
  static Handlers = BoldHandlers;
  static Renderer = BoldRenderer;

  static create(config?: Partial<ToggleMarkConfig>) {
    return new this(
      ToggleMark.create({
        type: BOLD_TYPE,
        hotkey: BOLD_HOTKEY,
        component: BOLD_COMPONENT,
        ...config
      })
    );
  }

  plugin = this.toggleMark.plugin;

  constructor(private readonly toggleMark: ToggleMark) {}

  isBoldActive: BoldController['isBoldActive'] = this.toggleMark.isToggleMarkActive;

  addBoldMark: BoldController['addBoldMark'] = this.toggleMark.addToggleMark;

  removeBoldMark: BoldController['removeBoldMark'] = this.toggleMark.removeToggleMark;

  toggleBoldMark: BoldController['toggleBoldMark'] = this.toggleMark.toggleToggleMark;
}
