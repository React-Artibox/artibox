import { useContext } from 'react';
import { Container } from '@artibox/slate-core';
import { ContainerContext } from './container.context';

export function useContainer(): Container<any, any> {
  return useContext(ContainerContext);
}

export type UseContainer = typeof useContainer;
