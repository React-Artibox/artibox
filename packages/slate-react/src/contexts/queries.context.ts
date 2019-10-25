import { Context, createContext } from 'react';
import { Queries } from '@artibox/slate-core';

export type QueriesContext<Q extends string> = Context<Queries<Q>>;
//  eslint-disable-next-line @typescript-eslint/no-explicit-any
export const QueriesContext = createContext<Queries<any>>({} as any);
