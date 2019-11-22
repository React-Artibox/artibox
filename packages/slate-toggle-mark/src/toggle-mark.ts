import { RendererBaseComponent, CommonMarkRenderer } from '@artibox/slate-common';
import { ToggleMarkController } from './toggle-mark.interfaces';
import { ToggleMarkHandlers } from './toggle-mark.handlers';

export interface ToggleMarkConfig {
  type: string;
  hotkey: string;
  component: RendererBaseComponent;
}

export class ToggleMark implements ToggleMarkController {
  static Handlers = ToggleMarkHandlers;
  static Renderer = CommonMarkRenderer;

  static create({ type, hotkey, component }: ToggleMarkConfig) {
    return new this(type, toggleMark => this.Handlers(hotkey, toggleMark), this.Renderer({ type, component }));
  }

  plugin = {
    ...this.handlersFactory(this),
    ...this.renderer
  } as const;

  constructor(
    public readonly type: string,
    private readonly handlersFactory: (toggleMarkController: ToggleMarkController) => ToggleMarkHandlers,
    private readonly renderer: CommonMarkRenderer
  ) {}

  isToggleMarkActive: ToggleMarkController['isToggleMarkActive'] = editor =>
    editor.value.activeMarks.some(mark => mark?.type === this.type);

  addToggleMark: ToggleMarkController['addToggleMark'] = editor => editor.addMark(this.type);

  removeToggleMark: ToggleMarkController['removeToggleMark'] = editor => editor.removeMark(this.type);

  toggleToggleMark: ToggleMarkController['toggleToggleMark'] = editor => editor.toggleMark(this.type);
}
