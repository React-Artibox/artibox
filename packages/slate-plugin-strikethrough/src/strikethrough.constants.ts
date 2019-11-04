export const STRIKETHROUGH_TYPE = 'strikethrough' as const;
export type STRIKETHROUGH_TYPE = typeof STRIKETHROUGH_TYPE;

export const STRIKETHROUGH_COMPONENT = 'del';
export type STRIKETHROUGH_COMPONENT = typeof STRIKETHROUGH_COMPONENT;

export const STRIKETHROUGH_HOTKEY = 'cmd+opt+d';
export type STRIKETHROUGH_HOTKEY = typeof STRIKETHROUGH_HOTKEY;

export const STRIKETHROUGH_QUERY_HAS = 'Query[Strikethrough] Has' as const;
export type STRIKETHROUGH_QUERY_HAS = typeof STRIKETHROUGH_QUERY_HAS;

export const STRIKETHROUGH_COMMAND_ADD = 'Command[Strikethrough] Add' as const;
export type STRIKETHROUGH_COMMAND_ADD = typeof STRIKETHROUGH_COMMAND_ADD;
export const STRIKETHROUGH_COMMAND_REMOVE = 'Command[Strikethrough] Remove' as const;
export type STRIKETHROUGH_COMMAND_REMOVE = typeof STRIKETHROUGH_COMMAND_REMOVE;
export const STRIKETHROUGH_COMMAND_TOGGLE = 'Command[Strikethrough] Toggle' as const;
export type STRIKETHROUGH_COMMAND_TOGGLE = typeof STRIKETHROUGH_COMMAND_TOGGLE;
