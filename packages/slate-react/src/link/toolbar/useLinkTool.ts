import { LinkUpsertLinkOptions } from '@artibox/slate-common/link';
import { useSlate } from 'slate-react';
import { useStartToolInput } from '../../toolbar';
import { ReactLink } from '../typings';

export type UseLinkToolOptions = LinkUpsertLinkOptions;

export function useLinkTool(controller: ReactLink, options: UseLinkToolOptions = {}) {
  const editor = useSlate();
  const startToolInput = useStartToolInput();

  return {
    active: controller.isSelectionInLink(editor),
    onClick: () =>
      startToolInput({
        getPlaceholder: locale => locale.editor.link.inputPlaceholder,
        confirm: url => {
          if (controller.isUrl(url)) {
            controller.upsertLink(editor, url, options);
          }
        }
      })
  };
}
