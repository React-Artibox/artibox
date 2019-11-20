import { Editor } from 'slate';

export interface CreateToggleMarkUtilsConfig<IA extends string, A extends string, R extends string, T extends string> {
  type: string;
  isActive: IA;
  add: A;
  remove: R;
  toggle: T;
}

export type ToggleMarkUtilsFactory<IA extends string, A extends string, R extends string, T extends string> = (
  type: string
) => ToggleMarkUtils<IA, A, R, T>;

export type ToggleMarkUtilIsActive = (editor: Editor) => boolean;
export type ToggleMarkUtilAdd = (editor: Editor) => Editor;
export type ToggleMarkUtilRemove = (editor: Editor) => Editor;
export type ToggleMarkUtilToggle = (editor: Editor) => Editor;

export type ToggleMarkUtils<IA extends string, A extends string, R extends string, T extends string> = {
  [isActive in IA]: ToggleMarkUtilIsActive;
} &
  {
    [add in A]: ToggleMarkUtilAdd;
  } &
  {
    [remove in R]: ToggleMarkUtilRemove;
  } &
  {
    [toggle in T]: ToggleMarkUtilToggle;
  };

export function createToggleMarkUtils<IA extends string, A extends string, R extends string, T extends string>(
  defaults: CreateToggleMarkUtilsConfig<IA, A, R, T>
): ToggleMarkUtilsFactory<IA, A, R, T> {
  const { type: defaultType, isActive, add, remove, toggle } = defaults;
  function ToggleMarkUtils(type = defaultType): ToggleMarkUtils<IA, A, R, T> {
    const utilIsActive: ToggleMarkUtilIsActive = editor => editor.value.activeMarks.some(mark => mark?.type === type);
    const utilAdd: ToggleMarkUtilAdd = editor => editor.addMark(type);
    const utilRemove: ToggleMarkUtilRemove = editor => editor.removeMark(type);
    const utilToggle: ToggleMarkUtilToggle = editor => editor.toggleMark(type);

    return {
      [isActive]: utilIsActive,
      [add]: utilAdd,
      [remove]: utilRemove,
      [toggle]: utilToggle
    } as ToggleMarkUtils<IA, A, R, T>;
  }

  return ToggleMarkUtils;
}
