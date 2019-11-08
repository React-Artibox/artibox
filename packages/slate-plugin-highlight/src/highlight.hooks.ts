import { createUseToggleMarkIsActive, createUseToggleMarkOnMouseDown } from '@artibox/slate-plugin-toggle-mark';
import { HIGHLIGHT_QUERY_HAS, HIGHLIGHT_COMMAND_TOGGLE } from './highlight.constants';

export const useHighlightIsActive = createUseToggleMarkIsActive(HIGHLIGHT_QUERY_HAS);

export const useHighlightOnMouseDown = createUseToggleMarkOnMouseDown(HIGHLIGHT_COMMAND_TOGGLE);
