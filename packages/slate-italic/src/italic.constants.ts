export const ITALIC_TYPE = 'italic' as const;
export type ITALIC_TYPE = typeof ITALIC_TYPE;

export const ITALIC_COMPONENT = 'i';
export type ITALIC_COMPONENT = typeof ITALIC_COMPONENT;

export const ITALIC_HOTKEY = 'cmd+i';
export type ITALIC_HOTKEY = typeof ITALIC_HOTKEY;

export const ITALIC_UTIL_IS_ACTIVE = 'isItalicIsActive' as const;
export type ITALIC_UTIL_IS_ACTIVE = typeof ITALIC_UTIL_IS_ACTIVE;
export const ITALIC_UTIL_ADD = 'addItalicMark' as const;
export type ITALIC_UTIL_ADD = typeof ITALIC_UTIL_ADD;
export const ITALIC_UTIL_REMOVE = 'removeItalicMark' as const;
export type ITALIC_UTIL_REMOVE = typeof ITALIC_UTIL_REMOVE;
export const ITALIC_UTIL_TOGGLE = 'toggleItalicMark' as const;
export type ITALIC_UTIL_TOGGLE = typeof ITALIC_UTIL_TOGGLE;
