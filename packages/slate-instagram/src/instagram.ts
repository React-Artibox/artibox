import { SchemaProperties } from 'slate';
import { RendererBaseComponent } from '@artibox/slate-renderer';
import { INSTAGRAM_TYPE } from './instagram.constants';
import InstagramComponent, { InstagramProps } from './instagram.component';
import { InstagramUtils } from './instagram.utils';
import { InstagramRenderer } from './instagram.renderer';
import { InstagramSchema } from './instagram.schema';

export interface InstagramConfig {
  type?: string;
  component?: RendererBaseComponent<InstagramProps>;
}

export class Instagram {
  static create(config?: InstagramConfig) {
    const type = config?.type ?? INSTAGRAM_TYPE;
    const component = config?.component ?? InstagramComponent;
    const utils = InstagramUtils(type);
    const renderer = InstagramRenderer({ type, component });
    const schema = InstagramSchema(type);

    return new this(utils, renderer, schema);
  }

  constructor(
    public readonly utils: InstagramUtils,
    private readonly renderer: InstagramRenderer,
    private readonly schema: SchemaProperties
  ) {}

  get plugin() {
    return {
      ...this.renderer,
      schema: this.schema
    };
  }
}
