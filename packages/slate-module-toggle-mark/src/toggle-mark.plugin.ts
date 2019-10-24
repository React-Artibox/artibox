import { CommandFunc } from 'slate';
import { HotkeyPlugin } from '@artibox/slate-plugin-hotkey';

export interface ToggleMarkPluginConfig {
  hotkey: string;
  commandToggle: CommandFunc;
}

export type ToggleMarkPlugin = HotkeyPlugin;

export function ToggleMarkPlugin(config: ToggleMarkPluginConfig): ToggleMarkPlugin {
  const { hotkey, commandToggle } = config;

  return HotkeyPlugin(hotkey, commandToggle);
}
