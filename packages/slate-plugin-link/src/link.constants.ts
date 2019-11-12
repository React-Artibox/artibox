export const LINK_TYPE = 'link' as const;
export type LINK_TYPE = typeof LINK_TYPE;

export const LINK_COMPONENT = 'a' as const;
export type LINK_COMPONENT = typeof LINK_COMPONENT;

export const LINK_DATA_KEY_URL = 'href' as const;
export type LINK_DATA_KEY_URL = typeof LINK_DATA_KEY_URL;

export const LINK_QUERY_URL = 'Query[Link] Url' as const;
export type LINK_QUERY_URL = typeof LINK_QUERY_URL;
export const LINK_QUERY_HAS = 'Query[Link] Has' as const;
export type LINK_QUERY_HAS = typeof LINK_QUERY_HAS;

export const LINK_COMMAND_REMOVE = 'Command[Link] Remove' as const;
export type LINK_COMMAND_REMOVE = typeof LINK_COMMAND_REMOVE;
export const LINK_COMMAND_SET = 'Command[Link] Set' as const;
export type LINK_COMMAND_SET = typeof LINK_COMMAND_SET;
