export const UNDERLINE_TYPE = 'underline' as const;
export type UNDERLINE_TYPE = typeof UNDERLINE_TYPE;

export const UNDERLINE_COMPONENT = 'u';
export type UNDERLINE_COMPONENT = typeof UNDERLINE_COMPONENT;

export const UNDERLINE_HOTKEY = 'cmd+u';
export type UNDERLINE_HOTKEY = typeof UNDERLINE_HOTKEY;

export const UNDERLINE_UTIL_IS_ACTIVE = 'isUnderlineActive' as const;
export type UNDERLINE_UTIL_IS_ACTIVE = typeof UNDERLINE_UTIL_IS_ACTIVE;
export const UNDERLINE_UTIL_ADD = 'addUnderlineMark' as const;
export type UNDERLINE_UTIL_ADD = typeof UNDERLINE_UTIL_ADD;
export const UNDERLINE_UTIL_REMOVE = 'removeUnderlineMark' as const;
export type UNDERLINE_UTIL_REMOVE = typeof UNDERLINE_UTIL_REMOVE;
export const UNDERLINE_UTIL_TOGGLE = 'toggleUnderlineMark' as const;
export type UNDERLINE_UTIL_TOGGLE = typeof UNDERLINE_UTIL_TOGGLE;
