import React, { ReactNode, useMemo } from 'react';
import { Theme } from '@artibox/theme';
import { LocaleDefinition } from '@artibox/locale';
import { enUS } from '@artibox/locale/en-US';
import { LocaleContext } from './locale';
import { resolveThemeToProps, ThemeContext, ThemeContextValue } from './theme';

export interface ConfigsProviderRenderProps {
  theme: ThemeContextValue;
  locale: LocaleDefinition;
}

export interface ConfigsProviderProps {
  theme?: Theme;
  locale?: LocaleDefinition;
  /**
   * Can pass any react elements or a render props which provide the resolved result.
   */
  children: ReactNode | ((props: ConfigsProviderRenderProps) => ReactNode);
}

function ConfigsProvider({ theme, locale = enUS, children }: ConfigsProviderProps) {
  const themeContext: ThemeContextValue = useMemo(
    () => ({
      props: theme ? resolveThemeToProps(theme) : {},
      theme
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={themeContext}>
      <LocaleContext.Provider value={locale}>
        {typeof children === 'function' ? children({ theme: themeContext, locale }) : children}
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  );
}

export default ConfigsProvider;
