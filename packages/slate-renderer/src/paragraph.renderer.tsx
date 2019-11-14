import { PARAGRAPH_TYPE } from '@artibox/slate-core';
import { CommonBlockRendererConfig, CommonBlockRenderer } from './common-block.renderer';

export type ParagraphRenderer = CommonBlockRenderer;

export function ParagraphRenderer(component: CommonBlockRendererConfig['component']): ParagraphRenderer {
  return CommonBlockRenderer({ type: PARAGRAPH_TYPE, component });
}
