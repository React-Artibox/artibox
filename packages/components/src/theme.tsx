import React, { ReactNode, CSSProperties, createContext, useMemo } from 'react';
import { Theme, ThemeObject } from '@artibox/theme';
import { convertCamelToKebab } from './utils/convert-camel-to-kebab';

export interface ThemeProps {
  className?: string;
  style?: CSSProperties;
}

export interface ThemeContextValue {
  props: ThemeProps;
  theme?: Theme;
}

export const ThemeContext = createContext<ThemeContextValue>({
  props: {}
});

/**
 * Add prefix to theme name.
 */
export function addThemeNamePrefix(theme?: string) {
  return `artibox-theme-${theme || 'artibox'}`;
}

export function resolveThemeObjectToCSSProperties(theme: ThemeObject): CSSProperties {
  const cssProps: Record<string, string> = {};

  for (const name in theme) {
    cssProps[`--artibox-${convertCamelToKebab(name)}`] = theme[name as keyof ThemeObject];
  }

  return cssProps;
}

export function resolveThemeToProps(theme: Theme): ThemeProps {
  const props: ThemeProps = {};

  if (typeof theme === 'string') {
    props.className = addThemeNamePrefix(theme);
  } else {
    props.style = resolveThemeObjectToCSSProperties(theme);
  }

  return props;
}

export interface ThemeProviderProps {
  theme?: Theme;
  children: ReactNode | ((themeContext: ThemeContextValue) => ReactNode);
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  const themeContextValue: ThemeContextValue = useMemo(
    () => ({
      props: theme ? resolveThemeToProps(theme) : {},
      theme
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {typeof children === 'function' ? children(themeContextValue) : children}
    </ThemeContext.Provider>
  );
}
