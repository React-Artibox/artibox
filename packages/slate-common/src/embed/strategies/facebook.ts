import { EmbedElement, EmbedStrategy } from '../common';

export type FacebookEmbedType = 'comment_embed' | 'post' | 'video';

export type FacebookEmbedData = {
  embedType: FacebookEmbedType;
  url: string;
  width?: number;
  height?: number;
};

export type FacebookDeserializedEmbedData = Omit<FacebookEmbedData, 'embedType'>;

export type FacebookEmbedElement = EmbedElement & FacebookEmbedData;

export type FacebookEmbedStrategy = EmbedStrategy<FacebookEmbedData, FacebookDeserializedEmbedData>;

export const FacebookEmbedStrategy: FacebookEmbedStrategy = {
  serialize: html => {
    const template = document.createElement('template');
    template.innerHTML = html;
    const { firstChild } = template.content;

    if (!firstChild || firstChild.nodeName !== 'IFRAME') {
      return undefined;
    }

    const iframe = firstChild as HTMLIFrameElement;
    const parsedURL = new URL(iframe.src);
    const href = parsedURL.searchParams.get('href');

    if (!href) {
      return undefined;
    }

    const resourceURL = new URL(href);
    const embedType = /^\/plugins\/(comment_embed|post|video).php$/.exec(parsedURL.pathname)?.[1] as
      | FacebookEmbedType
      | undefined;

    if (!embedType) {
      return;
    }

    return {
      embedType,
      url: `${resourceURL.pathname}${resourceURL.search}`,
      width: Number(iframe.width),
      height: Number(iframe.height)
    };
  },
  deserialize: ({ embedType, url, width, height }) => {
    const params = new URLSearchParams({
      href: `https://www.facebook.com${url}`,
      width: `${width}`,
      height: `${height}`
    }).toString();

    return {
      url: `https://www.facebook.com/plugins/${embedType}.php?${params}`,
      width,
      height
    };
  },
  isElementDataValid: ({ embedType, url, width, height }) =>
    typeof url === 'string' &&
    !!url &&
    (['comment_embed', 'post', 'video'] as FacebookEmbedType[]).includes(embedType as any) &&
    (typeof width === 'number' || typeof width === 'undefined') &&
    (typeof height === 'number' || typeof height === 'undefined')
};
