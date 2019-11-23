import { CommonMarkRendererConfig, CommonMarkRenderer } from '@artibox/slate-common';

export type ToggleMarkRendererDefaultConfig = Pick<CommonMarkRendererConfig, 'type' | 'component'>;

export type ToggleMarkRendererConfig = Partial<ToggleMarkRendererDefaultConfig>;

export type ToggleMarkRenderer = CommonMarkRenderer;

export function createToggleMarkRenderer(defaults: ToggleMarkRendererDefaultConfig) {
  const { type: defaultType, component: defaultComponent } = defaults;

  function ToggleMarkRenderer(config?: ToggleMarkRendererConfig) {
    const { type = defaultType, component = defaultComponent } = config || {};
    return CommonMarkRenderer({ type, component });
  }

  return ToggleMarkRenderer;
}
