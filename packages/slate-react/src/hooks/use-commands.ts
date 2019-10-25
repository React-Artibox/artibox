import { useContext } from 'react';
import { Commands } from '@artibox/slate-core';
import { CommandsContext } from '../contexts/commands.context';

export type UseCommands<C extends string> = () => Commands<C>;

export function createUseCommands<C extends string>(): UseCommands<C> {
  return () => useContext(CommandsContext);
}
