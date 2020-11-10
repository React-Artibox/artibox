import { Editor } from 'slate';
import { useEditor } from 'slate-react';
import { InputWidgetConfig } from '@artibox/slate-common/input-widget';
import { StartToolInput, useStartToolInput } from '../../toolbar';
import { ReactEmbed } from '../typings';

export function useEmbedTool<P extends string>(
  controller: ReactEmbed<P>,
  providers: P[],
  getPlaceholder: InputWidgetConfig['getPlaceholder'],
  startToolInput?: (editor: Editor, inputConfig: InputWidgetConfig) => void
) {
  const editor = useEditor();
  const defaultStartToolInput = useStartToolInput();
  const start: StartToolInput = startToolInput
    ? inputConfig => startToolInput(editor, inputConfig)
    : defaultStartToolInput;

  return {
    onClick: () =>
      start({
        getPlaceholder,
        confirm: embedCode => controller.insertEmbed(editor, providers, embedCode)
      })
  };
}
