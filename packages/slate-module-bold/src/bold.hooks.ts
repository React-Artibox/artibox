import { MarkModule } from '@artibox/slate-core';
import { createUseToggleMarkIsActive, createUseToggleMarkOnClick } from '@artibox/slate-module-toggle-mark';
import { BOLD_QUERY_HAS, BOLD_COMMAND_TOGGLE } from './bold.constants';

//  eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createUseBoldIsActive(mod?: MarkModule<BOLD_QUERY_HAS, any>) {
  return createUseToggleMarkIsActive(BOLD_QUERY_HAS, mod);
}

export const useBoldIsActive = createUseBoldIsActive();

//  eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createUseBoldOnClick(mod?: MarkModule<any, BOLD_COMMAND_TOGGLE>) {
  return createUseToggleMarkOnClick(BOLD_COMMAND_TOGGLE, mod);
}

export const useBoldOnClick = createUseBoldOnClick();
