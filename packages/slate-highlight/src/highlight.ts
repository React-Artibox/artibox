import { ToggleMarkConfig, ToggleMark } from '@artibox/slate-toggle-mark';
import { HIGHLIGHT_TYPE, HIGHLIGHT_COMPONENT, HIGHLIGHT_HOTKEY } from './highlight.constants';
import { HighlightController } from './highlight.interfaces';

export const HighlightHandlers = ToggleMark.Handlers;
export const HighlightRenderer = ToggleMark.Renderer;

export class Highlight implements HighlightController {
  static Handlers = HighlightHandlers;
  static Renderer = HighlightRenderer;

  static create(config?: Partial<ToggleMarkConfig>) {
    return new this(
      ToggleMark.create({
        type: HIGHLIGHT_TYPE,
        hotkey: HIGHLIGHT_HOTKEY,
        component: HIGHLIGHT_COMPONENT,
        ...config
      })
    );
  }

  plugin = this.toggleMark.plugin;

  constructor(private readonly toggleMark: ToggleMark) {}

  isHighlightActive: HighlightController['isHighlightActive'] = this.toggleMark.isToggleMarkActive;

  addHighlightMark: HighlightController['addHighlightMark'] = this.toggleMark.addToggleMark;

  removeHighlightMark: HighlightController['removeHighlightMark'] = this.toggleMark.removeToggleMark;

  toggleHighlightMark: HighlightController['toggleHighlightMark'] = this.toggleMark.toggleToggleMark;
}
