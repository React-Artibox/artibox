import { FacebookEmbedData } from '../types';

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
