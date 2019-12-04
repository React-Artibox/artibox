/**
 * Default type of heading.
 */
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

export const HEADING_LEVELS = [1, 2, 3, 4, 5, 6] as const;

/**
 * Default hotkey for toggling heading.
 *
 * @remarks
 * If the hotkey is `ctrl+opt`, the level 1 hotkey will be `ctrl+opt+1`, and so on.
 *
 * @see [is-hotkey]{@link https://www.npmjs.com/package/is-hotkey}
 */
export const HEADING_HOTKEY = 'ctrl+opt';
export type HEADING_HOTKEY = typeof HEADING_HOTKEY;
