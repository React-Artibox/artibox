import { useContext } from 'react';
import { Queries } from '@artibox/slate-core';
import { QueriesContext } from '../contexts/queries.context';

export type UseQueries<Q extends string> = () => Queries<Q>;

export function useQueries<Q extends string>(): Queries<Q> {
  return useContext(QueriesContext);
}
