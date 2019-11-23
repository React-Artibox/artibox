import { ToggleMarkCreateConfig, ToggleMarkForPluginConfig, ToggleMarkController } from '@artibox/slate-toggle-mark';
import { HIGHLIGHT_TYPE } from './highlight.constants';
import { HighlightHandlers } from './highlight.handlers';
import { HighlightRenderer } from './highlight.renderer';

export type HighlightCreateConfig = Partial<ToggleMarkCreateConfig>;

export type BlockquoteForPluginConfig = Partial<ToggleMarkForPluginConfig>;

export class Highlight extends ToggleMarkController {
  static create(config?: HighlightCreateConfig) {
    const { type = HIGHLIGHT_TYPE } = config || {};
    return new this(type);
  }

  forPlugin(config?: BlockquoteForPluginConfig) {
    const { hotkey, component } = config || {};
    return {
      ...HighlightHandlers({ hotkey, controller: this }),
      ...HighlightRenderer({ type: this.type, component })
    };
  }
}
