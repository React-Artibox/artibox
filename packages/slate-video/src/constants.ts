export const VIDEO_TYPE = 'video' as const;
export type VIDEO_TYPE = typeof VIDEO_TYPE;

export const VIDEO_PROVIDERS = ['youtube', 'vimeo'] as const;
export type VIDEO_PROVIDERS = typeof VIDEO_PROVIDERS[number];
