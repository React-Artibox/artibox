import { ToggleMarkConfig, ToggleMark } from '@artibox/slate-toggle-mark';
import { STRIKETHROUGH_TYPE, STRIKETHROUGH_COMPONENT, STRIKETHROUGH_HOTKEY } from './strikethrough.constants';
import { StrikethroughController } from './strikethrough.interfaces';

export const StrikethroughHandlers = ToggleMark.Handlers;
export const StrikethroughRenderer = ToggleMark.Renderer;

export class Strikethrough implements StrikethroughController {
  static Handlers = StrikethroughHandlers;
  static Renderer = StrikethroughRenderer;

  static create(config?: Partial<ToggleMarkConfig>) {
    return new this(
      ToggleMark.create({
        type: STRIKETHROUGH_TYPE,
        hotkey: STRIKETHROUGH_HOTKEY,
        component: STRIKETHROUGH_COMPONENT,
        ...config
      })
    );
  }

  plugin = this.toggleMark.plugin;

  constructor(private readonly toggleMark: ToggleMark) {}

  isStrikethroughActive: StrikethroughController['isStrikethroughActive'] = this.toggleMark.isToggleMarkActive;

  addStrikethroughMark: StrikethroughController['addStrikethroughMark'] = this.toggleMark.addToggleMark;

  removeStrikethroughMark: StrikethroughController['removeStrikethroughMark'] = this.toggleMark.removeToggleMark;

  toggleStrikethroughMark: StrikethroughController['toggleStrikethroughMark'] = this.toggleMark.toggleToggleMark;
}
