import { ToggleMarkCreateConfig, ToggleMarkForPluginConfig, ToggleMarkController } from '@artibox/slate-toggle-mark';
import { BOLD_TYPE } from './bold.constants';
import { BoldHandlers } from './bold.handlers';
import { BoldRenderer } from './bold.renderer';

export type BoldCreateConfig = Partial<ToggleMarkCreateConfig>;

export type BlockquoteForPluginConfig = Partial<ToggleMarkForPluginConfig>;

export class Bold extends ToggleMarkController {
  static create(config?: BoldCreateConfig) {
    const { type = BOLD_TYPE } = config || {};
    return new this(type);
  }

  forPlugin(config?: BlockquoteForPluginConfig) {
    const { hotkey, component } = config || {};
    return {
      ...BoldHandlers({ hotkey, controller: this }),
      ...BoldRenderer({ type: this.type, component })
    };
  }
}
