import { WithMarkType } from '../typings/leaf';
import { getMark } from '../queries/getMark';
import { ToggleMark } from './typings';

export type CreateToggleMarkCreatorOptions = WithMarkType;

export type CreateToggleMarkOptions = Partial<CreateToggleMarkCreatorOptions>;

export function createToggleMarkCreator(defaults: CreateToggleMarkCreatorOptions) {
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
