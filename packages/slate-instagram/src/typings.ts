import { RenderAttributes } from 'slate-react';

export interface InstagramEmbedApi {
  Embeds: {
    process: () => void;
  };
}

export interface InstagramProps extends RenderAttributes {
  url: string;
}
