import { Context, createContext } from 'react';
import { Commands } from '@artibox/slate-core';

export type CommandsContext<C extends string> = Context<Commands<C>>;
//  eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CommandsContext = createContext<Commands<any>>({} as any);
