import { FACEBOOK_EMBED_TYPES } from '../constants';
import { FacebookEmbedData } from '../types';

function getFacebookEmbedTypeFromPathname(pathname: string): FACEBOOK_EMBED_TYPES | null {
  if (pathname === '/plugins/post.php') {
    return 'post';
  } else if (pathname === '/plugins/video.php') {
    return 'video';
  }

  return null;
}

export function getFacebookEmbedDataFromHtml(html: string): FacebookEmbedData | undefined {
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
    type: getFacebookEmbedTypeFromPathname(parsedURL.pathname),
    url: `${resourceURL.pathname}${resourceURL.search}`,
    width: Number(iframe.width),
    height: Number(iframe.height)
  };
}
