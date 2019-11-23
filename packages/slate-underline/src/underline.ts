import { ToggleMarkCreateConfig, ToggleMarkForPluginConfig, ToggleMarkController } from '@artibox/slate-toggle-mark';
import { UNDERLINE_TYPE } from './underline.constants';
import { UnderlineHandlers } from './underline.handlers';
import { UnderlineRenderer } from './underline.renderer';

export type UnderlineCreateConfig = Partial<ToggleMarkCreateConfig>;

export type BlockquoteForPluginConfig = Partial<ToggleMarkForPluginConfig>;

export class Underline extends ToggleMarkController {
  static create(config?: UnderlineCreateConfig) {
    const { type = UNDERLINE_TYPE } = config || {};
    return new this(type);
  }

  forPlugin(config?: BlockquoteForPluginConfig) {
    const { hotkey, component } = config || {};

    return {
      ...UnderlineHandlers({ hotkey, controller: this }),
      ...UnderlineRenderer({ type: this.type, component })
    };
  }
}
