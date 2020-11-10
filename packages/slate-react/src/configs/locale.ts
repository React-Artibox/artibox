import { createContext, useContext } from 'react';
import { LocaleDefinition } from '@artibox/locale';
import { enUS } from '@artibox/locale/en-US';

export const LocaleContext = createContext<LocaleDefinition>(enUS);
export type LocaleContext = typeof LocaleContext;

export function useLocale() {
  return useContext(LocaleContext);
}
