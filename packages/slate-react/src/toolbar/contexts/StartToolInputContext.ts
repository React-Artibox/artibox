import { createContext } from 'react';
import { StartToolInput } from '../typings';

export const StartToolInputContext = createContext<StartToolInput>(() => {});
