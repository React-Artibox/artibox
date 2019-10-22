import { CommandFunc } from 'slate';
import { mergePlugins, MarkPlugin, HotkeyPlugin, RenderCommonMark } from '@artibox/slate-common';
import { BOLD_MARK_TYPE } from './constants';

/**
 * @todo
 * Add options on BoldPlugin.
 */
export function BoldPlugin(): MarkPlugin {
  const type = BOLD_MARK_TYPE;
  const addBoldMark: CommandFunc = editor => editor.addMark(type);

  return mergePlugins([
    {
      commands: {
        addBoldMark
      }
    },
    HotkeyPlugin('cmd+b', addBoldMark),
    RenderCommonMark({
      type: BOLD_MARK_TYPE,
      component: 'strong'
    })
  ]);
}
