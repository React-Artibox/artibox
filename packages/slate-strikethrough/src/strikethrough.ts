import { ToggleMarkCreateConfig, ToggleMarkForPluginConfig, ToggleMarkController } from '@artibox/slate-toggle-mark';
import { STRIKETHROUGH_TYPE } from './strikethrough.constants';
import { StrikethroughHandlers } from './strikethrough.handlers';
import { StrikethroughRenderer } from './strikethrough.renderer';

export type StrikethroughCreateConfig = Partial<ToggleMarkCreateConfig>;

export type BlockquoteForPluginConfig = Partial<ToggleMarkForPluginConfig>;

export class Strikethrough extends ToggleMarkController {
  static create(config?: StrikethroughCreateConfig) {
    const { type = STRIKETHROUGH_TYPE } = config || {};
    return new this(type);
  }

  forPlugin(config?: BlockquoteForPluginConfig) {
    const { hotkey, component } = config || {};
    return {
      ...StrikethroughHandlers({ hotkey, controller: this }),
      ...StrikethroughRenderer({ type: this.type, component })
    };
  }
}
