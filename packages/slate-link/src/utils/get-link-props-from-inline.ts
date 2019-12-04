import { Inline } from 'slate';
import { getLinkUrlFromInline } from './get-link-url-from-inline';
import { LinkProps } from '../typings';

export function getLinkPropsFromInline(inline: Inline): LinkProps {
  return {
    href: getLinkUrlFromInline(inline) || '',
    target: '_blank'
  };
}
