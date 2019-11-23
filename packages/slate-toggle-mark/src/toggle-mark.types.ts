import { HasNodeType } from '@artibox/slate-common';
import { ToggleMarkHandlersConfig } from './toggle-mark.handlers';
import { ToggleMarkRendererConfig } from './toggle-mark.renderer';

export type ToggleMarkCreateConfig = HasNodeType;

export type ToggleMarkForPluginConfig = Omit<
  ToggleMarkHandlersConfig & ToggleMarkRendererConfig,
  'type' | 'controller'
>;
