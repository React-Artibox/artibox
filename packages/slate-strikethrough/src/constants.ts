/**
 * Default type of strikethrough.
 */
export const STRIKETHROUGH_TYPE = 'strikethrough' as const;
export type STRIKETHROUGH_TYPE = typeof STRIKETHROUGH_TYPE;

/**
 * Default component of both renderer of editor and jsx serializer rule of strikethrough.
 */
export const STRIKETHROUGH_COMPONENT = 'del';
export type STRIKETHROUGH_COMPONENT = typeof STRIKETHROUGH_COMPONENT;

/**
 * Default hotkey for toggling strikethrough.
 *
 * @see [is-hotkey]{@link https://www.npmjs.com/package/is-hotkey}
 */
export const STRIKETHROUGH_HOTKEY = 'mod+opt+s';
export type STRIKETHROUGH_HOTKEY = typeof STRIKETHROUGH_HOTKEY;
