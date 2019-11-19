export {
  FACEBOOK_TYPE,
  FACEBOOK_EMBED_TYPES,
  FACEBOOK_DATA_KEY_TYPE,
  FACEBOOK_DATA_KEY_CONTENT,
  FACEBOOK_DATA_KEY_WIDTH,
  FACEBOOK_DATA_KEY_HEIGHT,
  FACEBOOK_COMMAND_ADD,
  FACEBOOK_REG
} from './facebook.constants';
export { createFacebookBlock, getFacebookEmbedDataFromHtmlCode, facebookAdd } from './facebook.utils';
export { FacebookCommandAdd, FacebookCommands } from './facebook.commands';
export { FacebookPluginConfig, FacebookPlugin } from './facebook.plugin';
