import { Editor, Plugin } from 'slate';
import { LINK_COMMAND_REMOVE, LINK_COMMAND_SET } from './link.constants';
import { LinkQueryHas } from './link.queries';
import { createLinkInline } from './link.utils';

export interface LinkCommandsConfig {
  type: string;
  queryHas: LinkQueryHas;
}

export type LinkCommandRemove = (editor: Editor) => Editor;

export type LinkCommandSet = (editor: Editor, url: string, text?: string) => Editor;

export type LinkCommands = Plugin['commands'] & {
  [LINK_COMMAND_REMOVE]: LinkCommandRemove;
  [LINK_COMMAND_SET]: LinkCommandSet;
};

export function LinkCommands(config: LinkCommandsConfig): LinkCommands {
  const { type, queryHas } = config;
  const commandRemove: LinkCommandRemove = editor => {
    const hasAnyLink = queryHas(editor);

    if (!hasAnyLink) {
      return editor;
    }

    return editor.value.inlines
      .filter(inline => inline?.type === type)
      .reduce((prev, inline) => prev!.unwrapInline(inline!.type), editor);
  };
  const commandSet: LinkCommandSet = (editor, url, text) => {
    const { isExpanded } = editor.value.selection;

    if (isExpanded) {
      return commandRemove(editor).wrapInline(createLinkInline(type, url));
    } else if (!text) {
      return editor;
    }

    return editor.insertInline(createLinkInline(type, url, text));
  };

  return {
    [LINK_COMMAND_REMOVE]: commandRemove,
    [LINK_COMMAND_SET]: commandSet
  };
}
