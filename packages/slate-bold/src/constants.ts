/**
 * Default type of bold.
 */
export const BOLD_TYPE = 'bold' as const;
export type BOLD_TYPE = typeof BOLD_TYPE;

/**
 * Default component of both renderer of editor and jsx serializer rule of bold.
 */
export const BOLD_COMPONENT = 'strong';
export type BOLD_COMPONENT = typeof BOLD_COMPONENT;

/**
 * Default hotkey for toggling bold.
 *
 * @see [is-hotkey]{@link https://www.npmjs.com/package/is-hotkey}
 */
export const BOLD_HOTKEY = 'mod+b';
export type BOLD_HOTKEY = typeof BOLD_HOTKEY;
