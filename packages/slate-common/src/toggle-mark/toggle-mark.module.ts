import { MarkModule } from '@artibox/slate-types';
import { ToggleMarkPluginConfig, ToggleMarkPlugin } from './toggle-mark.plugin';
import { CommonMarkRendererConfig, CommonMarkRenderer } from '../common-mark/common-mark.renderer';

export interface ToggleMarkModuleDefaultConfig<
  T extends string,
  QS extends string,
  CA extends string,
  CR extends string,
  CT extends string
> extends ToggleMarkPluginConfig<QS, CA, CR, CT> {
  type: T;
  component: CommonMarkRendererConfig['component'];
}

export type ToggleMarkModuleConfig<
  T extends string,
  QS extends string,
  CA extends string,
  CR extends string,
  CT extends string
> = {
  [key in keyof ToggleMarkModuleDefaultConfig<T, QS, CA, CR, CT>]?: ToggleMarkModuleDefaultConfig<
    T,
    QS,
    CA,
    CR,
    CT
  >[key];
};

export function createToggleMarkModule<
  DT extends string,
  DQS extends string,
  DCA extends string,
  DCR extends string,
  DCT extends string
>(defaults: ToggleMarkModuleDefaultConfig<DT, DQS, DCA, DCR, DCT>) {
  function ToggleMarkModule<
    T extends string = DT,
    QS extends string = DQS,
    CA extends string = DCA,
    CR extends string = DCR,
    CT extends string = DCT
  >(config?: ToggleMarkModuleConfig<T, QS, CA, CR, CT>): MarkModule<T, QS, CA | CR | CT> {
    const type = (config && config.type) || defaults.type;
    const hotkey = (config && config.hotkey) || defaults.hotkey;
    const component = (config && config.component) || defaults.component;
    const queryHas = (config && config.queryHas) || defaults.queryHas;
    const commandAdd = (config && config.commandAdd) || defaults.commandAdd;
    const commandRemove = (config && config.commandRemove) || defaults.commandRemove;
    const commandToggle = (config && config.commandToggle) || defaults.commandToggle;

    return {
      type: type as T,
      plugin: ToggleMarkPlugin({
        type,
        hotkey,
        queryHas,
        commandAdd,
        commandRemove,
        commandToggle
      }),
      renderer: CommonMarkRenderer({
        type,
        component
      })
    };
  }

  return ToggleMarkModule;
}
