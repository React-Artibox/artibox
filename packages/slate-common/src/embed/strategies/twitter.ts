import { EmbedElement, EmbedStrategy } from '../common';

export type TwitterEmbedType = 'tweet';

export type TwitterEmbedElementData = {
  embedType: TwitterEmbedType;
  account: string;
  hash?: string;
};

export type TwitterEmbedElement = EmbedElement & TwitterEmbedElementData;

export type TwitterEmbedStrategy = EmbedStrategy<TwitterEmbedElementData, string>;

export function getTwitterTweetDataFromUrl(url: string): TwitterEmbedElementData | undefined {
  const result = /^https:\/\/twitter.com\/([\w]*)\/status\/([\w-]*)/i.exec(url);

  if (result) {
    const [, account, hash] = result;

    return {
      embedType: 'tweet',
      account,
      hash
    };
  }
}

export function getTwitterTweetDataFromBlockquote(embedCode: string): TwitterEmbedElementData | undefined {
  const template = document.createElement('template');
  template.innerHTML = embedCode;
  const { firstChild } = template.content;

  if (!firstChild || firstChild.nodeName !== 'BLOCKQUOTE') {
    return;
  }

  const blockquote = firstChild as HTMLElement;
  const link = blockquote.lastChild as HTMLLinkElement | null | undefined;
  const url = link?.getAttribute('href');
  return url ? getTwitterTweetDataFromUrl(url) : undefined;
}

export const TwitterEmbedStrategy: TwitterEmbedStrategy = {
  serialize: embedCode => {
    const getter = embedCode.startsWith('<blockquote') ? getTwitterTweetDataFromBlockquote : getTwitterTweetDataFromUrl;

    return getter(embedCode);
  },
  deserialize: ({ embedType, account, hash }) => {
    if (embedType === 'tweet') {
      return `https://www.twitter.com/${account}/status/${hash}`;
    }

    return '';
  },
  isElementDataValid: ({ embedType, account, hash }) => {
    if (embedType === 'tweet') {
      return typeof account === 'string' && typeof hash === 'string';
    }

    return true;
  }
};
