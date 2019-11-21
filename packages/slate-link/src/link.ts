import { Inline, Text } from 'slate';
import { LINK_TYPE, LINK_DATA_KEY_URL } from './link.constants';
import { LinkController } from './link.interfaces';
import { getUrlFromInline } from './link.utils';
import { LinkRendererConfig, LinkRenderer } from './link.renderer';
import { LinkSchema } from './link.schemta';

export interface LinkConfig {
  type?: string;
  modal?: LinkRendererConfig['modal'];
}

export class Link implements LinkController {
  static Renderer = LinkRenderer;
  static Schema = LinkSchema;

  static create(config?: LinkConfig) {
    const type = config?.type ?? LINK_TYPE;
    const modal = config?.modal;

    return new this(
      type,
      linkController => this.Renderer({ type, modal, controller: linkController }),
      linkController => this.Schema(type, linkController)
    );
  }

  plugin = {
    ...this.rendererFactory(this),
    schema: this.schemaFactory(this)
  } as const;

  constructor(
    public readonly type: string,
    private readonly rendererFactory: (linkController: LinkController) => LinkRenderer,
    private readonly schemaFactory: (linkController: LinkController) => ReturnType<typeof LinkSchema>
  ) {}

  isLink: LinkController['isLink'] = inline => inline?.type === this.type;

  isSelectionInLink: LinkController['isSelectionInLink'] = editor => this.getCurrentAllLinks(editor).length > 0;

  getCurrentAllLinks: LinkController['getCurrentAllLinks'] = editor =>
    editor.value.inlines.filter(this.isLink).toArray();

  getCurrentFirstLink: LinkController['getCurrentFirstLink'] = editor => {
    const [link = null] = this.getCurrentAllLinks(editor);
    return link;
  };

  getCurrentFirstLinkUrl: LinkController['getCurrentFirstLinkUrl'] = editor => {
    const link = this.getCurrentFirstLink(editor);
    return link ? getUrlFromInline(link) : undefined;
  };

  createLinkInline: LinkController['createLinkInline'] = (url, text) =>
    Inline.fromJSON({
      type: this.type,
      data: { [LINK_DATA_KEY_URL]: url },
      nodes: text ? [Text.fromJSON({ text })] : undefined
    });

  removeLinkInline: LinkController['removeLinkInline'] = editor => {
    const hasAnyLink = this.isSelectionInLink(editor);

    if (!hasAnyLink) {
      return editor;
    }

    return this.getCurrentAllLinks(editor).reduce((prev, inline) => prev!.unwrapInline(inline!.type), editor);
  };

  setLinkInline: LinkController['setLinkInline'] = (editor, url, text) => {
    const { isExpanded } = editor.value.selection;

    if (isExpanded) {
      return this.removeLinkInline(editor).wrapInline(this.createLinkInline(url));
    } else if (!text) {
      return editor;
    }

    return editor.insertInline(this.createLinkInline(url, text));
  };
}
