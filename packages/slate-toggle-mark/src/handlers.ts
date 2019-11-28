import { Editor } from 'slate';
import { Plugin } from 'slate-react';
import { isKeyHotkey } from 'is-hotkey';
import { ToggleMarkController } from './controller';

export interface CreateToggleMarkHandlersCreatorDefaultConfig {
  hotkey: string;
}

export interface CreateToggleMarkHandlersCreatorConfig extends Partial<CreateToggleMarkHandlersCreatorDefaultConfig> {
  controller: ToggleMarkController;
}

export function createToggleMarkHandlersCreator(defaults: CreateToggleMarkHandlersCreatorDefaultConfig) {
  const { hotkey: defaultHotkey } = defaults;

  function createToggleMarkHandlers(config: CreateToggleMarkHandlersCreatorConfig): Plugin {
    const { hotkey = defaultHotkey, controller } = config;

    return {
      onKeyDown(event, editor, next) {
        if (isKeyHotkey(hotkey, event as any)) {
          return controller.toggle((editor as any) as Editor);
        }

        return next();
      }
    };
  }

  return createToggleMarkHandlers;
}
