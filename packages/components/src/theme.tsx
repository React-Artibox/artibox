import React, { ReactNode, createContext, useContext } from 'react';

export const ThemeContext = createContext<string>('');
export type ThemeContext = typeof ThemeContext;

export interface ThemeProviderProps {
  theme?: string;
  children: ReactNode | ((theme: string) => ReactNode);
}

export function resolveThemeName(theme?: string) {
  return `artibox-theme-${theme || 'artibox'}`;
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  const themeName = resolveThemeName(theme);

  return (
    <ThemeContext.Provider value={themeName}>
      {typeof children === 'function' ? children(themeName) : children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
