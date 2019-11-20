export const STRIKETHROUGH_TYPE = 'strikethrough' as const;
export type STRIKETHROUGH_TYPE = typeof STRIKETHROUGH_TYPE;

export const STRIKETHROUGH_COMPONENT = 'del';
export type STRIKETHROUGH_COMPONENT = typeof STRIKETHROUGH_COMPONENT;

export const STRIKETHROUGH_HOTKEY = 'cmd+opt+d';
export type STRIKETHROUGH_HOTKEY = typeof STRIKETHROUGH_HOTKEY;

export const STRIKETHROUGH_UTIL_IS_ACTIVE = 'isStrikethroughActive' as const;
export type STRIKETHROUGH_UTIL_IS_ACTIVE = typeof STRIKETHROUGH_UTIL_IS_ACTIVE;
export const STRIKETHROUGH_UTIL_ADD = 'addStrikethroughMark' as const;
export type STRIKETHROUGH_UTIL_ADD = typeof STRIKETHROUGH_UTIL_ADD;
export const STRIKETHROUGH_UTIL_REMOVE = 'removeStrikethroughMark' as const;
export type STRIKETHROUGH_UTIL_REMOVE = typeof STRIKETHROUGH_UTIL_REMOVE;
export const STRIKETHROUGH_UTIL_TOGGLE = 'toggleStrikethroughMark' as const;
export type STRIKETHROUGH_UTIL_TOGGLE = typeof STRIKETHROUGH_UTIL_TOGGLE;
