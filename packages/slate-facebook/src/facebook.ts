import { Block, Editor, SchemaProperties } from 'slate';
import { PARAGRAPH_TYPE } from '@artibox/slate-core';
import { RendererBaseComponent } from '@artibox/slate-renderer';
import { FACEBOOK_TYPE } from './facebook.constants';
import { FacebookEmbedData } from './facebook.types';
import { getFacebookEmbedDataFromHtmlCode } from './facebook.utils';
import FacebookComponent, { FacebookProps } from './facebook.component';
import { FacebookRenderer } from './facebook.renderer';
import { FacebookSchema } from './facebook.schema';

export interface FacebookConfig {
  type?: string;
  component?: RendererBaseComponent<FacebookProps>;
}

export class Facebook {
  static create(config?: FacebookConfig) {
    const type = config?.type ?? FACEBOOK_TYPE;
    const component = config?.component ?? FacebookComponent;
    const renderer = FacebookRenderer({ type, component });
    const schema = FacebookSchema(type);

    return new this(type, renderer, schema);
  }

  plugin = {
    ...this.renderer,
    schema: this.schema
  } as const;

  constructor(
    public readonly type: string,
    private readonly renderer: FacebookRenderer,
    private readonly schema: SchemaProperties
  ) {}

  createFacebookBlock = (embedData: FacebookEmbedData): Block => {
    return Block.fromJSON({ type: this.type, data: embedData });
  };

  addFacebookBlock = (editor: Editor, htmlCode: string): Editor => {
    const embedData = getFacebookEmbedDataFromHtmlCode(htmlCode);

    if (!embedData || !embedData.type) {
      return editor;
    }

    return editor.insertBlock(this.createFacebookBlock(embedData)).insertBlock(PARAGRAPH_TYPE);
  };
}
