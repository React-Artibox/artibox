import { SchemaProperties } from 'slate';
import { HEADING_TYPE, HEADING_LEVELS, HEADING_HOTKEY } from './heading.constants';
import { HeadingUtils } from './heading.utils';
import { HeadingHandlers } from './heading.handlers';
import { HeadingRenderer } from './heading.renderer';
import { HeadingSchema } from './heading.schema';

export interface HeadingConfig {
  type?: string;
  /**
   * If the hotkey is `ctrl+opt`, the level 1 hotkey will be `ctrl+opt+1`, and so on.
   */
  hotkey?: string;
  /**
   * The blacklist of heading levels.
   * If no pass, all levels will be enabled.
   */
  disabled?: HEADING_LEVELS[];
}

export class Heading {
  static create(config?: HeadingConfig) {
    const disabled = config?.disabled ?? [];
    const enabled = HEADING_LEVELS.filter(level => !disabled.includes(level));
    const type = config?.type ?? HEADING_TYPE;
    const hotkey = config?.hotkey ?? HEADING_HOTKEY;
    const utils = HeadingUtils(type);
    const handlers = HeadingHandlers(hotkey, enabled, utils);
    const renderer = HeadingRenderer(type, utils);
    const schema = HeadingSchema({ type, enabled });

    return new this(utils, handlers, renderer, schema);
  }

  constructor(
    public readonly utils: HeadingUtils,
    private readonly handlers: HeadingHandlers,
    private readonly renderer: HeadingRenderer,
    private readonly schema: SchemaProperties
  ) {}

  get plugin() {
    return {
      ...this.handlers,
      ...this.renderer,
      schema: this.schema
    };
  }
}
