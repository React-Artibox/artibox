import { Context, createContext } from 'react';
import { Commands } from '@artibox/slate-core';

export type CommandsContext<C extends string> = Context<Commands<C>>;
export const CommandsContext = createContext<Commands<any>>({} as any);
