import {
  FACEBOOK_EMBED_TYPES,
  FACEBOOK_DATA_KEY_TYPE,
  FACEBOOK_DATA_KEY_URL,
  FACEBOOK_DATA_KEY_WIDTH,
  FACEBOOK_DATA_KEY_HEIGHT
} from './facebook.constants';
import { FacebookEmbedData } from './facebook.interfaces';

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
    [FACEBOOK_DATA_KEY_TYPE]: getFacebookEmbedTypeFromPathname(parsedURL.pathname),
    [FACEBOOK_DATA_KEY_URL]: `${resourceURL.pathname}${resourceURL.search}`,
    [FACEBOOK_DATA_KEY_WIDTH]: Number(iframe.width),
    [FACEBOOK_DATA_KEY_HEIGHT]: Number(iframe.height)
  };
}

export function getSrcFromEmbedData(embedData: FacebookEmbedData): string {
  const type = embedData.type;
  const { width, height, url } = embedData;
  const params = new URLSearchParams({
    href: `https://www.facebook.com${url}`,
    width: `${width}`,
    height: `${height}`
  }).toString();

  if (type === 'post') {
    return `https://www.facebook.com/plugins/post.php?${params}`;
  } else if (type === 'video') {
    return `https://www.facebook.com/plugins/video.php?${params}`;
  }

  return '';
}
