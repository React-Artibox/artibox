import { getMark } from '../queries/getMark';
import { ToggleMark } from './typings';

export interface CreateToggleMarkOptions {
  type?: string;
}

export function createToggleMarkCreator(defaults: Required<CreateToggleMarkOptions>) {
  return ({ type = defaults.type }: CreateToggleMarkOptions = {}): ToggleMark => {
    const isToggleMarkActive: ToggleMark['isToggleMarkActive'] = editor => {
      const mark = getMark<boolean>(editor, type);
      return mark === true;
    };
    const toggleMark: ToggleMark['toggleMark'] = editor => {
      const isActive = isToggleMarkActive(editor);

      if (isActive) {
        editor.removeMark(type);
      } else {
        editor.addMark(type, true);
      }
    };

    return {
      type,
      isToggleMarkActive,
      toggleMark
    };
  };
}
