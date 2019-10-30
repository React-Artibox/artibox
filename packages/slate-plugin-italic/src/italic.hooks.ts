import { createUseToggleMarkIsActive, createUseToggleMarkOnClick } from '@artibox/slate-plugin-toggle-mark';
import { ITALIC_QUERY_HAS, ITALIC_COMMAND_TOGGLE } from './italic.constants';

export const useItalicIsActive = createUseToggleMarkIsActive(ITALIC_QUERY_HAS);

export const useItalicOnClick = createUseToggleMarkOnClick(ITALIC_COMMAND_TOGGLE);
