import { CommonBlockRendererConfig, CommonBlockRenderer } from '@artibox/slate-common/renderers/common-block.renderer';

export type BlockquoteRendererConfig = Pick<CommonBlockRendererConfig, 'type' | 'component'>;

export type BlockquoteRenderer = CommonBlockRenderer;

export function BlockquoteRenderer(config: BlockquoteRendererConfig) {
  const { type, component } = config;
  return CommonBlockRenderer({ type, component });
}
