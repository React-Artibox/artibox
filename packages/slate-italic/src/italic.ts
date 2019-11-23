import { ToggleMarkCreateConfig, ToggleMarkForPluginConfig, ToggleMarkController } from '@artibox/slate-toggle-mark';
import { ITALIC_TYPE } from './italic.constants';
import { ItalicHandlers } from './italic.handlers';
import { ItalicRenderer } from './italic.renderer';

export type ItalicCreateConfig = Partial<ToggleMarkCreateConfig>;

export type BlockquoteForPluginConfig = Partial<ToggleMarkForPluginConfig>;

export class Italic extends ToggleMarkController {
  static create(config?: ItalicCreateConfig) {
    const { type = ITALIC_TYPE } = config || {};
    return new this(type);
  }

  forPlugin(config?: BlockquoteForPluginConfig) {
    const { hotkey, component } = config || {};
    return {
      ...ItalicHandlers({ hotkey, controller: this }),
      ...ItalicRenderer({ type: this.type, component })
    };
  }
}
