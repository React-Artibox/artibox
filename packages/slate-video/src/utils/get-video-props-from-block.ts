import { Block } from 'slate';
import { VideoProps } from '../typings';

export function getVideoPropsFromBlock(block: Block): VideoProps {
  const { data } = block;
  const provider = data.get('provider');
  const id = data.get(provider);
  return { id, provider };
}
