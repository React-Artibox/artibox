/**
 * Default type of instagram.
 */
export const INSTAGRAM_TYPE = 'instagram' as const;
export type INSTAGRAM_TYPE = typeof INSTAGRAM_TYPE;

/**
 * The regex for testing the code copied from `Embed Post of Instagram`.
 */
export const INSTAGRAM_REG = /<blockquote.*class="instagram-media".*www.instagram.com\/embed\.js/;
