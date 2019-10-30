import { createContext } from 'react';
import { Container } from '@artibox/slate-core';

export const ContainerContext = createContext<Container<any, any>>({} as Container<any, any>);
export type ContainerContext = typeof ContainerContext;
