import { Editor } from 'slate';
import { useMemo, MouseEventHandler } from 'react';
import { getQuery, getCommand } from '@artibox/slate-core';
import { HEADING_LEVELS, HEADING_QUERY_HAS, HEADING_COMMAND_TOGGLE } from './heading.constants';
import { HeadingQueryHas } from './heading.queries';
import { HeadingCommandToggle } from './heading.commands';

export function useHeadingIsActive(editor: Editor, level: HEADING_LEVELS) {
  const query = useMemo(() => getQuery<HeadingQueryHas>(editor, HEADING_QUERY_HAS), [editor]);
  return query(level);
}

export function useHeadingOnClick(editor: Editor, level: HEADING_LEVELS) {
  return useMemo<MouseEventHandler>(() => {
    const command = getCommand<HeadingCommandToggle>(editor, HEADING_COMMAND_TOGGLE);
    return event => {
      event.preventDefault();
      command(level);
    };
  }, [editor, level]);
}
