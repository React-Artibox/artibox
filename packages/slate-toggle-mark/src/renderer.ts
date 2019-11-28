import { CreateCommonMarkRendererConfig, createCommonMarkRenderer } from '@artibox/slate-common/renderers/common-mark';

export type CreateToggleMarkRendererCreatorDefaultConfig = Pick<CreateCommonMarkRendererConfig, 'type' | 'component'>;

export type CreateToggleMarkRendererCreatorConfig = Partial<CreateToggleMarkRendererCreatorDefaultConfig>;

export function createToggleMarkRendererCreator(defaults: CreateToggleMarkRendererCreatorDefaultConfig) {
  const { type: defaultType, component: defaultComponent } = defaults;

  function createToggleMarkRenderer(config?: CreateToggleMarkRendererCreatorConfig) {
    const { type = defaultType, component = defaultComponent } = config || {};
    return createCommonMarkRenderer({ type, component });
  }

  return createToggleMarkRenderer;
}
