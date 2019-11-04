export const HIGHLIGHT_TYPE = 'highlight' as const;
export type HIGHLIGHT_TYPE = typeof HIGHLIGHT_TYPE;

export const HIGHLIGHT_COMPONENT = 'mark';
export type HIGHLIGHT_COMPONENT = typeof HIGHLIGHT_COMPONENT;

export const HIGHLIGHT_HOTKEY = 'cmd+h';
export type HIGHLIGHT_HOTKEY = typeof HIGHLIGHT_HOTKEY;

export const HIGHLIGHT_QUERY_HAS = 'Query[Highlight] Has' as const;
export type HIGHLIGHT_QUERY_HAS = typeof HIGHLIGHT_QUERY_HAS;

export const HIGHLIGHT_COMMAND_ADD = 'Command[Highlight] Add' as const;
export type HIGHLIGHT_COMMAND_ADD = typeof HIGHLIGHT_COMMAND_ADD;
export const HIGHLIGHT_COMMAND_REMOVE = 'Command[Highlight] Remove' as const;
export type HIGHLIGHT_COMMAND_REMOVE = typeof HIGHLIGHT_COMMAND_REMOVE;
export const HIGHLIGHT_COMMAND_TOGGLE = 'Command[Highlight] Toggle' as const;
export type HIGHLIGHT_COMMAND_TOGGLE = typeof HIGHLIGHT_COMMAND_TOGGLE;
