import { Context, createContext } from 'react';
import { Queries } from '@artibox/slate-core';

export type QueriesContext<Q extends string> = Context<Queries<Q>>;
export const QueriesContext = createContext<Queries<any>>({} as any);
