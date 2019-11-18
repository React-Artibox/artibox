export const VIDEO_TYPE = 'video' as const;
export type VIDEO_TYPE = typeof VIDEO_TYPE;

export const VIDEO_PROVIDERS = ['youtube'] as const;
export type VIDEO_PROVIDERS = typeof VIDEO_PROVIDERS[number];

export const VIDEO_DATA_KEY_PROVIDER = 'provider';
export type VIDEO_DATA_KEY_PROVIDER = typeof VIDEO_DATA_KEY_PROVIDER;

export const VIDEO_COMMAND_ADD = 'Command[Video] Add' as const;
export type VIDEO_COMMAND_ADD = typeof VIDEO_COMMAND_ADD;

/**
 * youtube
 */
export const youtubeTemplate = 'https://www.youtube.com/watch?v={{id}}';
export const youtubeEmbedTemplate = `https://www.youtube.com/embed/{{id}}?origin=${window.origin}`;
export const youtubeReg = /^https:\/\/www.youtube.com\/watch\?v=([\w-]*)/i;
export const youtubeEmbedReg = /^https:\/\/www.youtube.com\/embed\/([\w-]*)/i;
