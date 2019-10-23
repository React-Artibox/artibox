import { CommandFunc, QueryFunc } from 'slate';
import { MarkPlugin } from '../types';
import { HotkeyPlugin } from '../hotkey/hotkey.plugin';
import { RenderCommonMark, RenderCommonMarkConfig } from '../common-mark/common-mark.renderer';
import { mergePlugins } from '../utils/merge-plugins';

export interface ToggleMarkPluginDefaultConfig<
  QS extends string,
  CA extends string,
  CR extends string,
  CT extends string
> {
  type: RenderCommonMarkConfig['type'];
  component: RenderCommonMarkConfig['component'];
  hotkey: string;
  queryHas: QS;
  commandAdd: CA;
  commandRemove: CR;
  commandToggle: CT;
}

export type ToggleMarkPluginConfig<QS extends string, CA extends string, CR extends string, CT extends string> = {
  [key in keyof ToggleMarkPluginDefaultConfig<QS, CA, CR, CT>]?: ToggleMarkPluginDefaultConfig<QS, CA, CR, CT>[key];
};

export interface ToggleMarkPlugin<QS extends string, CA extends string, CR extends string, CT extends string>
  extends MarkPlugin {
  queries: {
    [k in QS]: QueryFunc;
  };
  commands: {
    [k in CA | CR | CT]: CommandFunc;
  };
}

export function createToggleMarkPlugin<DQS extends string, DCA extends string, DCR extends string, DCT extends string>(
  defaults: ToggleMarkPluginDefaultConfig<DQS, DCA, DCR, DCT>
) {
  function ToggleMarkPlugin<
    QS extends string = DQS,
    CA extends string = DCA,
    CR extends string = DCR,
    CT extends string = DCT
  >(config?: ToggleMarkPluginConfig<QS, CA, CR, CT>): ToggleMarkPlugin<QS, CA, CR, CT> {
    const type = (config && config.type) || defaults.type;
    const hotkey = (config && config.hotkey) || defaults.hotkey;
    const component = (config && config.component) || defaults.component;
    const hasMarkName = (config && config.queryHas) || defaults.queryHas;
    const addMarkName = (config && config.commandAdd) || defaults.commandAdd;
    const removeMarkName = (config && config.commandRemove) || defaults.commandRemove;
    const toggleMarkName = (config && config.commandToggle) || defaults.commandToggle;

    const hasMark: QueryFunc = editor => editor.value.activeMarks.some(mark => (mark && mark.type) === type);
    const addMark: CommandFunc = editor => editor.addMark(type);
    const removeMark: CommandFunc = editor => editor.removeMark(type);
    const toggleMark: CommandFunc = editor => editor.toggleMark(type);

    return mergePlugins([
      {
        queries: {
          [hasMarkName]: hasMark
        },
        commands: {
          [addMarkName]: addMark,
          [removeMarkName]: removeMark,
          [toggleMarkName]: toggleMark
        }
      },
      HotkeyPlugin(hotkey, toggleMark),
      RenderCommonMark({
        type,
        component
      })
    ]);
  }

  return ToggleMarkPlugin;
}
