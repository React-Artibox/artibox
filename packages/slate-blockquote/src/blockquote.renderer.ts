import { CommonBlockRendererConfig, CommonBlockRenderer } from '@artibox/slate-common/renderers/common-block.renderer';
import { BLOCKQUOTE_TYPE, BLOCKQUOTE_COMPONENT } from './blockquote.constants';

export type BlockquoteRendererConfig = Partial<Pick<CommonBlockRendererConfig, 'type' | 'component'>>;

export type BlockquoteRenderer = CommonBlockRenderer;

export function BlockquoteRenderer(config?: BlockquoteRendererConfig) {
  const { type = BLOCKQUOTE_TYPE, component = BLOCKQUOTE_COMPONENT } = config || {};
  return CommonBlockRenderer({ type, component });
}
