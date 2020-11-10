import { EmbedElement, EmbedStrategy } from '../common';

export type YoutubeEmbedElementData = {
  videoId: string;
};

export type YoutubeEmbedElement = EmbedElement & YoutubeEmbedElementData;

export type YoutubeEmbedStrategy = EmbedStrategy<YoutubeEmbedElementData, string>;

export const YoutubeEmbedStrategy: YoutubeEmbedStrategy = {
  serialize: embedCode => {
    const videoId = /^https:\/\/www.youtube.com\/(watch\?v=|embed\/)([\w-]*)/i.exec(embedCode)?.[2];

    if (videoId) {
      return {
        videoId
      };
    }
  },
  deserialize: ({ videoId }) => `https://www.youtube.com/embed/${videoId}`,
  isElementDataValid: ({ videoId }) => typeof videoId === 'string' && !!videoId
};
