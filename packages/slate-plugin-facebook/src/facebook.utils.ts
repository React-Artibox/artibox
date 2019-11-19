import { Block } from 'slate';
import { getCommand } from '@artibox/slate-core';
import { FACEBOOK_EMBED_TYPES, FACEBOOK_COMMAND_ADD } from './facebook.constants';
import { FacebookEmbedData } from './facebook.types';
import { FacebookCommandAdd } from './facebook.commands';

function getFacebookEmbedTypeFromPathname(pathname: string): FACEBOOK_EMBED_TYPES | null {
  if (pathname === '/plugins/post.php') {
    return 'post';
  } else if (pathname === '/plugins/video.php') {
    return 'video';
  }

  return null;
}

export function getFacebookEmbedDataFromHtmlCode(html: string): FacebookEmbedData | undefined {
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

  return {
    width: Number(iframe.width),
    height: Number(iframe.height),
    content: `${resourceURL.pathname}${resourceURL.search}`,
    type: getFacebookEmbedTypeFromPathname(parsedURL.pathname)
  };
}

export function createFacebookBlock(type: string, embedData: FacebookEmbedData): Block {
  return Block.fromJSON({ type, data: embedData });
}

/**
 * @public
 */
export const facebookAdd: FacebookCommandAdd = (editor, url) =>
  getCommand<FacebookCommandAdd>(editor, FACEBOOK_COMMAND_ADD)(url);
