import { EmbedElement, EmbedStrategy } from '../common';

export type VimeoEmbedElementData = {
  videoId: string;
};

export type VimeoEmbedElement = EmbedElement & VimeoEmbedElementData;

export type VimeoEmbedStrategy = EmbedStrategy<VimeoEmbedElementData, string>;

export const VimeoEmbedStrategy: VimeoEmbedStrategy = {
  serialize: embedCode => {
    const videoId = (/^https:\/\/vimeo.com\/([\w-]*)/i.exec(embedCode) ||
      /^https:\/\/player.vimeo.com\/video\/([\w-]*)/i.exec(embedCode))?.[1];

    if (videoId) {
      return {
        videoId
      };
    }
  },
  deserialize: ({ videoId }) => `https://player.vimeo.com/video/${videoId}`,
  isElementDataValid: ({ videoId }) => typeof videoId === 'string' && !!videoId
};
