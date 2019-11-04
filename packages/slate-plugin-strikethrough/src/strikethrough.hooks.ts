import { createUseToggleMarkIsActive, createUseToggleMarkOnClick } from '@artibox/slate-plugin-toggle-mark';
import { STRIKETHROUGH_QUERY_HAS, STRIKETHROUGH_COMMAND_TOGGLE } from './strikethrough.constants';

export const useStrikethroughIsActive = createUseToggleMarkIsActive(STRIKETHROUGH_QUERY_HAS);

export const useStrikethroughOnClick = createUseToggleMarkOnClick(STRIKETHROUGH_COMMAND_TOGGLE);
