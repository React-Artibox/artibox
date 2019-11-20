export const INSTAGRAM_TYPE = 'instagram' as const;
export type INSTAGRAM_TYPE = typeof INSTAGRAM_TYPE;

export const INSTAGRAM_COMMAND_ADD = 'Command[Instagram] Add' as const;
export type INSTAGRAM_COMMAND_ADD = typeof INSTAGRAM_COMMAND_ADD;

export const INSTAGRAM_REG = /<blockquote.*class="instagram-media".*www.instagram.com\/embed\.js/;
