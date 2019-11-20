export const HIGHLIGHT_TYPE = 'highlight' as const;
export type HIGHLIGHT_TYPE = typeof HIGHLIGHT_TYPE;

export const HIGHLIGHT_COMPONENT = 'mark';
export type HIGHLIGHT_COMPONENT = typeof HIGHLIGHT_COMPONENT;

export const HIGHLIGHT_HOTKEY = 'cmd+h';
export type HIGHLIGHT_HOTKEY = typeof HIGHLIGHT_HOTKEY;

export const HIGHLIGHT_UTIL_IS_ACTIVE = 'isHighlightActive' as const;
export type HIGHLIGHT_UTIL_IS_ACTIVE = typeof HIGHLIGHT_UTIL_IS_ACTIVE;
export const HIGHLIGHT_UTIL_ADD = 'addHighlightMark' as const;
export type HIGHLIGHT_UTIL_ADD = typeof HIGHLIGHT_UTIL_ADD;
export const HIGHLIGHT_UTIL_REMOVE = 'removeHighlightMark' as const;
export type HIGHLIGHT_UTIL_REMOVE = typeof HIGHLIGHT_UTIL_REMOVE;
export const HIGHLIGHT_UTIL_TOGGLE = 'toggleHighlightMark' as const;
export type HIGHLIGHT_UTIL_TOGGLE = typeof HIGHLIGHT_UTIL_TOGGLE;
