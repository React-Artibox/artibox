import {
  CreateCommonBlockRendererConfig,
  createCommonBlockRenderer
} from '@artibox/slate-common/renderers/common-block';
import { SEPARATION_LINE_TYPE, SEPARATION_LINE_COMPONENT } from './constants';

export type CreateSeparationLineRendererConfig = Partial<Pick<CreateCommonBlockRendererConfig, 'type' | 'component'>>;

export function createSeparationLineRenderer(config?: CreateSeparationLineRendererConfig) {
  const { type = SEPARATION_LINE_TYPE, component = SEPARATION_LINE_COMPONENT } = config || {};
  return createCommonBlockRenderer({ type, component, isVoid: true });
}
