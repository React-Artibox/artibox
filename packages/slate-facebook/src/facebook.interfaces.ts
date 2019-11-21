import { Block, Editor } from 'slate';
import {
  FACEBOOK_EMBED_TYPES,
  FACEBOOK_DATA_KEY_TYPE,
  FACEBOOK_DATA_KEY_URL,
  FACEBOOK_DATA_KEY_WIDTH,
  FACEBOOK_DATA_KEY_HEIGHT
} from './facebook.constants';

export interface FacebookEmbedData {
  [FACEBOOK_DATA_KEY_TYPE]: FACEBOOK_EMBED_TYPES | null;
  [FACEBOOK_DATA_KEY_URL]: string;
  [FACEBOOK_DATA_KEY_WIDTH]: number;
  [FACEBOOK_DATA_KEY_HEIGHT]: number;
}

export interface FacebookController {
  createFacebookBlock(embedData: FacebookEmbedData): Block;
  addFacebookBlock(editor: Editor, htmlCode: string): Editor;
}
