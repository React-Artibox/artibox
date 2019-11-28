export const FACEBOOK_TYPE = 'facebook' as const;
export type FACEBOOK_TYPE = typeof FACEBOOK_TYPE;

export const FACEBOOK_EMBED_TYPES = ['post', 'video'] as const;
export type FACEBOOK_EMBED_TYPES = typeof FACEBOOK_EMBED_TYPES[number];

export const FACEBOOK_REG = /^(?:<iframe\s).*src="https:\/\/((?:www|m)\.)?(?:facebook\.com|fb\.com)\/plugins\/(video|post)\.php\?([^"]*href=[^"]*)"[^>]*>/;
