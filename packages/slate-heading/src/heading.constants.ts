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
