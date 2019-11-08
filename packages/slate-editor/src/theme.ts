import { createContext, useContext } from 'react';

export const ThemeContext = createContext<string>('');
export type ThemeContext = typeof ThemeContext;

export function useTheme() {
  return useContext(ThemeContext);
}
