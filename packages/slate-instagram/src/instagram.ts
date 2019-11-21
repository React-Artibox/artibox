import { SchemaProperties, Block } from 'slate';
import { PARAGRAPH_TYPE } from '@artibox/slate-core';
import { RendererBaseComponent } from '@artibox/slate-renderer';
import { INSTAGRAM_DATA_KEY_URL } from './instagram.constants';
import { INSTAGRAM_TYPE } from './instagram.constants';
import { InstagramController } from './instagram.interfaces';
import { getInstagramUrlFromEmbedCode } from './instagram.utils';
import InstagramComponent, { InstagramProps } from './instagram.component';
import { InstagramRenderer } from './instagram.renderer';
import { InstagramSchema } from './instagram.schema';

export interface InstagramConfig {
  type?: string;
  component?: RendererBaseComponent<InstagramProps>;
}

export class Instagram implements InstagramController {
  static Renderer = InstagramRenderer;
  static Schema = InstagramSchema;

  static create(config?: InstagramConfig) {
    const type = config?.type ?? INSTAGRAM_TYPE;
    const component = config?.component ?? InstagramComponent;

    return new this(type, this.Renderer({ type, component }), this.Schema(type));
  }

  plugin = {
    ...this.renderer,
    schema: this.schema
  } as const;

  constructor(
    public readonly type: string,
    private readonly renderer: InstagramRenderer,
    private readonly schema: SchemaProperties
  ) {}

  createInstagramBlock: InstagramController['createInstagramBlock'] = url =>
    Block.fromJSON({
      type: this.type,
      data: { [INSTAGRAM_DATA_KEY_URL]: url }
    });

  addInstagramBlock: InstagramController['addInstagramBlock'] = (editor, embedCode) => {
    const url = getInstagramUrlFromEmbedCode(embedCode);

    if (!url) {
      return editor;
    }

    return editor.insertBlock(this.createInstagramBlock(url)).insertBlock(PARAGRAPH_TYPE);
  };
}
