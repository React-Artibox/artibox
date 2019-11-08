import { Editor } from 'slate';
import { useMemo, MouseEventHandler } from 'react';
import { getQuery, getCommand } from '@artibox/slate-core';
import { BLOCKQUOTE_QUERY_HAS, BLOCKQUOTE_COMMAND_TOGGLE } from './blockquote.constants';
import { BlockquoteQueryHas } from './blockquote.queries';
import { BlockquoteCommandWrap } from './blockquote.commands';

export function useBlockquoteIsActive(editor: Editor) {
  const query = useMemo(() => getQuery<BlockquoteQueryHas>(editor, BLOCKQUOTE_QUERY_HAS), [editor]);
  return query();
}

export function useBlockquoteOnMouseDown(editor: Editor) {
  return useMemo<MouseEventHandler>(() => {
    const command = getCommand<BlockquoteCommandWrap>(editor, BLOCKQUOTE_COMMAND_TOGGLE);
    return event => {
      event.preventDefault();
      command();
    };
  }, [editor]);
}
