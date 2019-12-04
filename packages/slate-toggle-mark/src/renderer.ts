import { CreateCommonMarkRendererConfig, createCommonMarkRenderer } from '@artibox/slate-common/renderers/common-mark';

export type CreateToggleMarkRendererConfig = Pick<CreateCommonMarkRendererConfig, 'type' | 'component'>;

export function createToggleMarkRenderer(config: CreateToggleMarkRendererConfig) {
  return createCommonMarkRenderer(config);
}
