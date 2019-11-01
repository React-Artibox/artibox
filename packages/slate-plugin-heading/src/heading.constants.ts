export const HEADING_TYPE = 'heading' as const;
export type HEADING_TYPE = typeof HEADING_TYPE;
export const HEADING_COMPONENTS = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6'
} as const;
export type HEADING_COMPONENTS = typeof HEADING_COMPONENTS;
export const HEADING_LEVELS: HEADING_LEVELS[] = [1, 2, 3, 4, 5, 6];
export type HEADING_LEVELS = keyof HEADING_COMPONENTS;
export const HEADING_HOTKEY = 'ctrl+opt';
export type HEADING_HOTKEY = typeof HEADING_HOTKEY;
export const HEADING_DATA_KEY_LEVEL = 'level';
export type HEADING_DATA_KEY_LEVEL = typeof HEADING_DATA_KEY_LEVEL;
export const HEADING_QUERY_HAS = 'Query[Heading] Has' as const;
export type HEADING_QUERY_HAS = typeof HEADING_QUERY_HAS;
export const HEADING_QUERY_LEVEL = 'Query[Heading] Level' as const;
export type HEADING_QUERY_LEVEL = typeof HEADING_QUERY_LEVEL;
export const HEADING_COMMAND_END = 'Command[Heading] End' as const;
export type HEADING_COMMAND_END = typeof HEADING_COMMAND_END;
export const HEADING_COMMAND_TOGGLE = 'Command[Heading] Toggle' as const;
export type HEADING_COMMAND_TOGGLE = typeof HEADING_COMMAND_TOGGLE;
