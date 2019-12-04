/**
 * Default type of highlight.
 */
export const HIGHLIGHT_TYPE = 'highlight' as const;
export type HIGHLIGHT_TYPE = typeof HIGHLIGHT_TYPE;

/**
 * Default component of both renderer of editor and jsx serializer rule of highlight.
 */
export const HIGHLIGHT_COMPONENT = 'mark';
export type HIGHLIGHT_COMPONENT = typeof HIGHLIGHT_COMPONENT;

/**
 * Default hotkey for toggling highlight.
 *
 * @see [is-hotkey]{@link https://www.npmjs.com/package/is-hotkey}
 */
export const HIGHLIGHT_HOTKEY = 'mod+h';
export type HIGHLIGHT_HOTKEY = typeof HIGHLIGHT_HOTKEY;
