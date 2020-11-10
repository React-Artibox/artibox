import { EmbedElement, EmbedStrategy } from '../common';

export type InstagramEmbedElementData = {
  url: string;
};

export type InstagramEmbedElement = EmbedElement & InstagramEmbedElementData;

export type InstagramEmbedStrategy = EmbedStrategy<InstagramEmbedElementData, string>;

export function getInstagramUrlFromUrl(url: string): string | undefined {
  return /^https:\/\/www.instagram.com\/([\w]*\/[\w-]*)\//i.exec(url)?.[1];
}

export function getInstagramUrlFromBlockquote(embedCode: string): string | undefined {
  const template = document.createElement('template');
  template.innerHTML = embedCode;
  const { firstChild } = template.content;

  if (!firstChild || firstChild.nodeName !== 'BLOCKQUOTE') {
    return;
  }

  const blockquote = firstChild as HTMLElement;
  const link = (blockquote.firstChild as HTMLDivElement).children[0] as HTMLLinkElement | null | undefined;
  const url = link?.getAttribute('href');
  return url ? getInstagramUrlFromUrl(url) : undefined;
}

export const InstagramEmbedStrategy: InstagramEmbedStrategy = {
  serialize: embedCode => {
    const getter = embedCode.startsWith('<blockquote') ? getInstagramUrlFromBlockquote : getInstagramUrlFromUrl;
    const url = getter(embedCode);

    if (url) {
      return {
        url
      };
    }
  },
  deserialize: ({ url }) => `https://www.instagram.com/${url}/`,
  isElementDataValid: ({ url }) => typeof url === 'string' && !!url
};
