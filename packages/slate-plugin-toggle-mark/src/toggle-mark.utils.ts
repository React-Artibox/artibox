import { getQuery, getCommand } from '@artibox/slate-core';
import { ToggleMarkQueryHas } from './toggle-mark.queries';
import { ToggleMarkCommandToggle } from './toggle-mark.commands';

export function createToggleMarkIsActive(queryHas: string): ToggleMarkQueryHas {
  return editor => getQuery<ToggleMarkQueryHas>(editor, queryHas)();
}

export function createToggleMarkToggle(commandToggle: string): ToggleMarkCommandToggle {
  return editor => getCommand<ToggleMarkCommandToggle>(editor, commandToggle)();
}
