import {
  CreateCommonBlockRendererConfig,
  createCommonBlockRenderer
} from '@artibox/slate-common/renderers/common-block';

export type CreateBlockquoteRendererConfig = Pick<CreateCommonBlockRendererConfig, 'type' | 'component'>;

export function createBlockquoteRenderer(config: CreateBlockquoteRendererConfig) {
  const { type, component } = config;
  return createCommonBlockRenderer({ type, component });
}
