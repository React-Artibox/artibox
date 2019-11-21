import { Inline } from 'slate';
import { LINK_DATA_KEY_URL } from './link.constants';

export function isUrl(arg: string): boolean {
  //  eslint-disable-next-line no-useless-escape
  return /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(
    arg
  );
}

export function getUrlFromInline(inline: Inline): string | undefined {
  return inline.data.get(LINK_DATA_KEY_URL);
}
