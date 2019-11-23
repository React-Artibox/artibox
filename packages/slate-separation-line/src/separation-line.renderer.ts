import { CommonBlockRendererConfig, CommonBlockRenderer } from '@artibox/slate-common';
import { SEPARATION_LINE_TYPE, SEPARATION_LINE_COMPONENT } from './separation-line.constants';

export type SeparationLineRendererConfig = Partial<Pick<CommonBlockRendererConfig, 'type' | 'component'>>;

export type SeparationLineRenderer = CommonBlockRenderer;

export function SeparationLineRenderer(config?: SeparationLineRendererConfig): SeparationLineRenderer {
  const { type = SEPARATION_LINE_TYPE, component = SEPARATION_LINE_COMPONENT } = config || {};
  return CommonBlockRenderer({ type, component, isVoid: true });
}
