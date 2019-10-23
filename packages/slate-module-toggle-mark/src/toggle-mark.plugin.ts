import { CommandFunc, QueryFunc } from 'slate';
import { MarkPlugin } from '@artibox/slate-types';
import { HotkeyPlugin } from '@artibox/slate-plugin-hotkey';
import { mergePlugins } from '@artibox/slate-common';

export interface ToggleMarkPluginConfig<QS extends string, CA extends string, CR extends string, CT extends string> {
  type: string;
  hotkey: string;
  queryHas: QS;
  commandAdd: CA;
  commandRemove: CR;
  commandToggle: CT;
}

export type ToggleMarkPlugin<QS extends string, CA extends string, CR extends string, CT extends string> = MarkPlugin<
  QS,
  CA | CR | CT
>;

export function ToggleMarkPlugin<QS extends string, CA extends string, CR extends string, CT extends string>(
  config: ToggleMarkPluginConfig<QS, CA, CR, CT>
): ToggleMarkPlugin<QS, CA, CR, CT> {
  const { type, hotkey, queryHas, commandAdd, commandRemove, commandToggle } = config;

  const hasMark: QueryFunc = editor => editor.value.activeMarks.some(mark => (mark && mark.type) === type);
  const addMark: CommandFunc = editor => editor.addMark(type);
  const removeMark: CommandFunc = editor => editor.removeMark(type);
  const toggleMark: CommandFunc = editor => editor.toggleMark(type);

  return mergePlugins([
    {
      queries: {
        [queryHas]: hasMark
      },
      commands: {
        [commandAdd]: addMark,
        [commandRemove]: removeMark,
        [commandToggle]: toggleMark
      }
    },
    HotkeyPlugin(hotkey, toggleMark)
  ]);
}
