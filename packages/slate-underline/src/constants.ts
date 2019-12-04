/**
 * Default type of underline.
 */
export const UNDERLINE_TYPE = 'underline' as const;
export type UNDERLINE_TYPE = typeof UNDERLINE_TYPE;

/**
 * Default component of both renderer of editor and jsx serializer rule of underline.
 */
export const UNDERLINE_COMPONENT = 'u';
export type UNDERLINE_COMPONENT = typeof UNDERLINE_COMPONENT;

/**
 * Default hotkey for toggling underline.
 *
 * @see [is-hotkey]{@link https://www.npmjs.com/package/is-hotkey}
 */
export const UNDERLINE_HOTKEY = 'mod+u';
export type UNDERLINE_HOTKEY = typeof UNDERLINE_HOTKEY;
