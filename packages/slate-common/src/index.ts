/**
 * merge
 */
export { mergePlugins } from './merge';

/**
 * common-mark
 */
export {
  CommonMarkRendererConfigRenderIf,
  CommonMarkRendererConfig,
  CommonMarkRenderer,
  defaultCommonMarkRenderIf
} from './common-mark/common-mark.renderer';

/**
 * toggle-mark
 */
export { ToggleMarkPluginConfig, ToggleMarkPlugin } from './toggle-mark/toggle-mark.plugin';
export {
  ToggleMarkModuleDefaultConfig,
  ToggleMarkModuleConfig,
  createToggleMarkModule
} from './toggle-mark/toggle-mark.module';
