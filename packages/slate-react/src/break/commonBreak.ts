import { createOnKeyDownBreak } from './createOnKeyDownBreak';
import { ExitBreakRule, SoftBreakRule } from './typings';

export const COMMON_EXIT_BREAK_ON_BEFORE_HOTKEY = 'mod+enter';
export const COMMON_EXIT_BREAK_ON_AFTER_HOTKEY = 'mod+shift+enter';
export const COMMON_EXIT_BREAK_ON_BEFORE_RULE: ExitBreakRule = {
  hotkey: COMMON_EXIT_BREAK_ON_BEFORE_HOTKEY
};
export const COMMON_EXIT_BREAK_ON_AFTER_RULE: ExitBreakRule = {
  hotkey: COMMON_EXIT_BREAK_ON_AFTER_HOTKEY,
  before: true
};
export const COMMON_EXIT_BREAK_RULES = [COMMON_EXIT_BREAK_ON_AFTER_RULE, COMMON_EXIT_BREAK_ON_BEFORE_RULE];

export const COMMON_SOFT_BREAK_HOTKEY = 'shift+enter';
export const COMMON_SOFT_BREAK_RULE: SoftBreakRule = {
  hotkey: COMMON_SOFT_BREAK_HOTKEY
};

export const COMMON_ON_KEY_DOWN_BREAK = createOnKeyDownBreak({
  exitBreak: {
    rules: COMMON_EXIT_BREAK_RULES
  },
  softBreak: {
    rules: [COMMON_SOFT_BREAK_RULE]
  }
});
