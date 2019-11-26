import React, { ReactNode, createContext, useContext } from 'react';
import '@artibox/theme/default';

export const ThemeContext = createContext<string>('');
export type ThemeContext = typeof ThemeContext;

export interface ThemeProviderProps {
  theme?: string;
  children: ReactNode | ((theme: string) => ReactNode);
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  const themeName = `artibox-theme-${theme || 'default'}`;

  return (
    <ThemeContext.Provider value={themeName}>
      {typeof children === 'function' ? children(themeName) : children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
