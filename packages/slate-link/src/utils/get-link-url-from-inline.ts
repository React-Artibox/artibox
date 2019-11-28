import { Inline } from 'slate';

export function getLinkUrlFromInline(inline: Inline): string | undefined {
  return inline.data.get('href');
}
