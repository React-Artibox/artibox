import React, { ReactNode, createContext, useContext } from 'react';

export const ThemeContext = createContext<string>('');
export type ThemeContext = typeof ThemeContext;

export interface ThemeProviderProps {
  theme?: string;
  children: ReactNode | ((theme: string) => ReactNode);
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  const themeName = `artibox-theme-${theme || 'artibox'}`;

  return (
    <ThemeContext.Provider value={themeName}>
      {typeof children === 'function' ? children(themeName) : children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
