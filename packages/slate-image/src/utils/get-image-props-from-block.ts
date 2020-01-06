import { Block, BlockJSON } from 'slate';
import { getImageSrcFromBlock } from './get-image-src-from-block';
import { getImageStyleFromBlock } from './get-image-style-from-block';
import { HostingResolvers, ImageProps } from '../typings';

export function getImagePropsFromBlock(block: Block | BlockJSON, hostingResolvers?: HostingResolvers): ImageProps {
  return {
    src: getImageSrcFromBlock(block, hostingResolvers),
    style: getImageStyleFromBlock(block)
  };
}
