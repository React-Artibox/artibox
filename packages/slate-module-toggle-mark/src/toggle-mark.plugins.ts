import { CommandFunc } from 'slate';
import { HotkeyPlugin } from '@artibox/slate-plugin-hotkey';

export interface ToggleMarkPluginsConfig {
  hotkey: string;
  commandToggle: CommandFunc;
}

export type ToggleMarkPlugins = [HotkeyPlugin];

export function ToggleMarkPlugins(config: ToggleMarkPluginsConfig): ToggleMarkPlugins {
  const { hotkey, commandToggle } = config;

  return [HotkeyPlugin(hotkey, commandToggle)];
}
