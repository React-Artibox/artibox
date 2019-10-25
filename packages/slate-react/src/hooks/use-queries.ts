import { useContext } from 'react';
import { Queries } from '@artibox/slate-core';
import { QueriesContext } from '../contexts/queries.context';

export type UseQueries<C extends string> = () => Queries<C>;

export function createUseQueries<C extends string>(): UseQueries<C> {
  return () => useContext(QueriesContext);
}
