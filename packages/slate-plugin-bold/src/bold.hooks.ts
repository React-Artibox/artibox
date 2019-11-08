import { createUseToggleMarkIsActive, createUseToggleMarkOnMouseDown } from '@artibox/slate-plugin-toggle-mark';
import { BOLD_QUERY_HAS, BOLD_COMMAND_TOGGLE } from './bold.constants';

export const useBoldIsActive = createUseToggleMarkIsActive(BOLD_QUERY_HAS);

export const useBoldOnMouseDown = createUseToggleMarkOnMouseDown(BOLD_COMMAND_TOGGLE);
