/**
 * Default type of video.
 */
export const VIDEO_TYPE = 'video' as const;
export type VIDEO_TYPE = typeof VIDEO_TYPE;

/**
 * Supported video providers.
 */
export const VIDEO_PROVIDERS = ['youtube', 'vimeo'] as const;
