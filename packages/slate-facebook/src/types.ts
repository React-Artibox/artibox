import { RenderAttributes } from 'slate-react';
import { FACEBOOK_EMBED_TYPES } from './constants';

export interface FacebookEmbedData {
  type: FACEBOOK_EMBED_TYPES | null;
  url: string;
  width: number;
  height: number;
}

export type FacebookProps = RenderAttributes & FacebookEmbedData;
