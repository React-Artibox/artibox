import {
  CreateCommonBlockRendererConfig,
  createCommonBlockRenderer
} from '@artibox/slate-common/renderers/common-block';

export type CreateSeparationLineRendererConfig = Pick<CreateCommonBlockRendererConfig, 'type' | 'component'>;

export function createSeparationLineRenderer(config: CreateSeparationLineRendererConfig) {
  const { type, component } = config;
  return createCommonBlockRenderer({ type, component, isVoid: true });
}
