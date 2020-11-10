import { createLink, CreateLinkOptions } from '@artibox/slate-common/link';
import { createRenderElement } from '../core';
import { ReactLink } from './typings';
import { defaultRenderLinkElement } from './defaultRenderLinkElement';

export interface CreateReactLinkOptions extends CreateLinkOptions {
  /**
   * If `true`, transform pasted url text to link.
   *
   * @default true
   */
  pastedUrlToLink?: boolean;
}

export function createReactLink(options: CreateReactLinkOptions = {}): ReactLink {
  const { pastedUrlToLink = true } = options;
  const core = createLink(options);
  const { type, isUrl } = core;

  return {
    ...core,
    createRenderElement: ({ render = defaultRenderLinkElement } = {}) => createRenderElement({ type, render }),
    with(editor) {
      const { insertData, insertText } = editor;

      editor.insertData = data => {
        const text = data.getData('text/plain');

        if (text) {
          if (core.isSelectionInLink(editor)) {
            insertText(text);
            return;
          }

          if (pastedUrlToLink && isUrl(text)) {
            core.upsertLink(editor, text);
            return;
          }
        }

        insertData(data);
      };

      return core.with(editor);
    }
  };
}
