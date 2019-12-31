import { Inline, InlineJSON } from 'slate';
import { getImageSrcFromInline } from './get-image-src-from-inline';
import { getImageStyleFromInline } from './get-image-style-from-inline';
import { HostingResolvers, ImageProps } from '../typings';

export function getImagePropsFromInline(inline: Inline | InlineJSON, hostingResolvers?: HostingResolvers): ImageProps {
  return {
    src: getImageSrcFromInline(inline, hostingResolvers),
    style: getImageStyleFromInline(inline)
  };
}
