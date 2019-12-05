import { Inline, InlineJSON } from 'slate';
import { getLinkUrlFromInline } from './get-link-url-from-inline';
import { LinkProps } from '../typings';

export function getLinkPropsFromInline(inline: Inline | InlineJSON): LinkProps {
  return {
    href: getLinkUrlFromInline(inline) || '',
    target: '_blank'
  };
}
