import { Block } from 'slate';
import { FacebookEmbedData } from '../typings';

export function getFacebookEmbedDataFromBlock(block: Block): FacebookEmbedData {
  const { data } = block;
  return {
    type: data.get('type'),
    url: data.get('url'),
    width: data.get('width'),
    height: data.get('height')
  };
}
