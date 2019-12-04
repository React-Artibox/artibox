/**
 * Default type of italic.
 */
export const ITALIC_TYPE = 'italic' as const;
export type ITALIC_TYPE = typeof ITALIC_TYPE;

/**
 * Default component of both renderer of editor and jsx serializer rule of italic.
 */
export const ITALIC_COMPONENT = 'i';
export type ITALIC_COMPONENT = typeof ITALIC_COMPONENT;

/**
 * Default hotkey for toggling italic.
 *
 * @see [is-hotkey]{@link https://www.npmjs.com/package/is-hotkey}
 */
export const ITALIC_HOTKEY = 'mod+i';
export type ITALIC_HOTKEY = typeof ITALIC_HOTKEY;
