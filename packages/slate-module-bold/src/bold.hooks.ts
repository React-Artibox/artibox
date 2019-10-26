import { createUseToggleMarkIsActive, createUseToggleMarkOnClick } from '@artibox/slate-module-toggle-mark';
import { BOLD_QUERY_HAS, BOLD_COMMAND_TOGGLE } from './bold.constants';

export const useBoldIsActive = createUseToggleMarkIsActive(BOLD_QUERY_HAS);

export const useBoldOnClick = createUseToggleMarkOnClick(BOLD_COMMAND_TOGGLE);
