import { CSSProperties, createContext, useContext } from 'react';
import { convertCamelToKebab } from '@artibox/utils/convertCamelToKebab';
import { Theme, ThemeObject } from '@artibox/theme';

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

export function resolveThemeObjectToStyle(theme: ThemeObject): CSSProperties {
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
    props.style = resolveThemeObjectToStyle(theme);
  }

  return props;
}

export function useTheme() {
  return useContext(ThemeContext);
}
