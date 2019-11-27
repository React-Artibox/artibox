import React, { FC, createContext, useContext } from 'react';
import { LocaleDefinition } from '@artibox/locale';
import { enUS } from '@artibox/locale/en-US';

export const LocaleContext = createContext<LocaleDefinition>(enUS);
export type LocaleContext = typeof LocaleContext;

export interface LocaleProviderProps {
  locale?: LocaleDefinition;
}

export const LocaleProvider: FC<LocaleProviderProps> = ({ locale = enUS, children }) => (
  <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
);

export function useLocale() {
  return useContext(LocaleContext);
}
