export const BOLD_TYPE = 'bold' as const;
export type BOLD_TYPE = typeof BOLD_TYPE;

export const BOLD_COMPONENT = 'strong';
export type BOLD_COMPONENT = typeof BOLD_COMPONENT;

export const BOLD_HOTKEY = 'cmd+b';
export type BOLD_HOTKEY = typeof BOLD_HOTKEY;

export const BOLD_UTIL_IS_ACTIVE = 'isBoldActive' as const;
export type BOLD_UTIL_IS_ACTIVE = typeof BOLD_UTIL_IS_ACTIVE;
export const BOLD_UTIL_ADD = 'addBoldMark' as const;
export type BOLD_UTIL_ADD = typeof BOLD_UTIL_ADD;
export const BOLD_UTIL_REMOVE = 'reoveBoldMark' as const;
export type BOLD_UTIL_REMOVE = typeof BOLD_UTIL_REMOVE;
export const BOLD_UTIL_TOGGLE = 'toggleBoldMark' as const;
export type BOLD_UTIL_TOGGLE = typeof BOLD_UTIL_TOGGLE;
