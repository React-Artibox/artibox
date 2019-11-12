import { Editor } from 'slate';
import { useMemo } from 'react';
import { getQuery, getCommand } from '@artibox/slate-core';
import { LINK_QUERY_HAS, LINK_COMMAND_REMOVE, LINK_COMMAND_SET } from './link.constants';
import { LinkQueryHas } from './link.queries';
import { LinkCommandRemove, LinkCommandSet } from './link.commands';

export function useLinkIsActive(editor: Editor) {
  const query = useMemo(() => getQuery<LinkQueryHas>(editor, LINK_QUERY_HAS), [editor]);
  return query();
}

export function useLinkRemove(editor: Editor) {
  return useMemo(() => getCommand<LinkCommandRemove>(editor, LINK_COMMAND_REMOVE), [editor]);
}

export function useLinkSet(editor: Editor) {
  return useMemo(() => getCommand<LinkCommandSet>(editor, LINK_COMMAND_SET), [editor]);
}
