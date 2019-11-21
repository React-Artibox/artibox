export const VIDEO_TYPE = 'video' as const;
export type VIDEO_TYPE = typeof VIDEO_TYPE;

export const VIDEO_PROVIDERS = ['youtube', 'vimeo'] as const;
export type VIDEO_PROVIDERS = typeof VIDEO_PROVIDERS[number];

export const VIDEO_DATA_KEY_PROVIDER = 'provider';
export type VIDEO_DATA_KEY_PROVIDER = typeof VIDEO_DATA_KEY_PROVIDER;
