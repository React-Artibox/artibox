import { Block } from 'slate';
import { PARAGRAPH_TYPE } from '@artibox/slate-core';
import { RendererBaseComponent } from '@artibox/slate-renderer';
import { FACEBOOK_TYPE } from './facebook.constants';
import { FacebookController } from './facebook.interfaces';
import { getFacebookEmbedDataFromHtmlCode } from './facebook.utils';
import FacebookComponent, { FacebookProps } from './facebook.component';
import { FacebookRenderer } from './facebook.renderer';
import { FacebookSchema } from './facebook.schema';

export interface FacebookConfig {
  type?: string;
  component?: RendererBaseComponent<FacebookProps>;
}

export class Facebook implements FacebookController {
  static Renderer = FacebookRenderer;
  static Schema = FacebookSchema;

  static create(config?: FacebookConfig) {
    const type = config?.type ?? FACEBOOK_TYPE;
    const component = config?.component ?? FacebookComponent;

    return new this(type, this.Renderer({ type, component }), this.Schema(type));
  }

  plugin = {
    ...this.renderer,
    schema: this.schema
  } as const;

  constructor(
    public readonly type: string,
    private readonly renderer: FacebookRenderer,
    private readonly schema: ReturnType<typeof FacebookSchema>
  ) {}

  createFacebookBlock: FacebookController['createFacebookBlock'] = embedData => {
    return Block.fromJSON({ type: this.type, data: embedData });
  };

  addFacebookBlock: FacebookController['addFacebookBlock'] = (editor, htmlCode) => {
    const embedData = getFacebookEmbedDataFromHtmlCode(htmlCode);

    if (!embedData || !embedData.type) {
      return editor;
    }

    return editor.insertBlock(this.createFacebookBlock(embedData)).insertBlock(PARAGRAPH_TYPE);
  };
}
