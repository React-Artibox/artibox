import { RendererBaseComponent, CommonMarkRenderer } from '@artibox/slate-renderer';
import { ToggleMarkUtilsFactory, ToggleMarkUtils } from './toggle-mark.utils';
import { ToggleMarkHandlersFactory, ToggleMarkHandlers } from './toggle-mark.handlers';

export interface CreateToggleMarkPluginConfig<IA extends string, A extends string, R extends string, T extends string> {
  Utils: ToggleMarkUtilsFactory<IA, A, R, T>;
  Handlers: ToggleMarkHandlersFactory<IA, A, R, T>;
  type: string;
  hotkey: string;
  component: RendererBaseComponent;
}

export interface ToggleMarkConfig {
  type?: string;
  hotkey?: string;
  component?: RendererBaseComponent;
}

export interface ToggleMark<IA extends string, A extends string, R extends string, T extends string> {
  utils: ToggleMarkUtils<IA, A, R, T>;
  plugin: ToggleMarkHandlers & CommonMarkRenderer;
}

export interface ToggleMarkFactory<IA extends string, A extends string, R extends string, T extends string> {
  new (utils: ToggleMarkUtils<IA, A, R, T>, handlers: ToggleMarkHandlers, renderer: CommonMarkRenderer): ToggleMark<
    IA,
    A,
    R,
    T
  >;
  create(config?: ToggleMarkConfig): ToggleMark<IA, A, R, T>;
}

export function createToggleMark<IA extends string, A extends string, R extends string, T extends string>(
  defaults: CreateToggleMarkPluginConfig<IA, A, R, T>
): ToggleMarkFactory<IA, A, R, T> {
  const { Utils, Handlers, type: defaultType, hotkey: defaultHotkey, component: defaultComponent } = defaults;

  return class implements ToggleMark<IA, A, R, T> {
    static create(config?: ToggleMarkConfig) {
      const type = config?.type ?? defaultType;
      const hotkey = config?.hotkey ?? defaultHotkey;
      const component = config?.component ?? defaultComponent;
      const utils = Utils(type);
      const handlers = Handlers(hotkey, utils);
      const renderer = CommonMarkRenderer({ type, component });

      return new this(utils, handlers, renderer);
    }

    constructor(
      public readonly utils: ToggleMarkUtils<IA, A, R, T>,
      private readonly handlers: ToggleMarkHandlers,
      private readonly renderer: CommonMarkRenderer
    ) {}

    get plugin() {
      return { ...this.handlers, ...this.renderer };
    }
  };
}
