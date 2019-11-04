import { createUseToggleMarkIsActive, createUseToggleMarkOnClick } from '@artibox/slate-plugin-toggle-mark';
import { UNDERLINE_QUERY_HAS, UNDERLINE_COMMAND_TOGGLE } from './underline.constants';

export const useUnderlineIsActive = createUseToggleMarkIsActive(UNDERLINE_QUERY_HAS);

export const useUnderlineOnClick = createUseToggleMarkOnClick(UNDERLINE_COMMAND_TOGGLE);
