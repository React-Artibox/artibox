import { Inline, Text, Data } from 'slate';
import { getQuery, getCommand } from '@artibox/slate-core';
import { LINK_DATA_KEY_URL, LINK_QUERY_HAS, LINK_COMMAND_REMOVE, LINK_COMMAND_SET } from './link.constants';
import { LinkQueryHas } from './link.queries';
import { LinkCommandRemove, LinkCommandSet } from './link.commands';

export function isUrl(arg: string): boolean {
  //  eslint-disable-next-line no-useless-escape
  return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(
    arg
  );
}

export function getUrlFromInline(inline: Inline): string | undefined {
  return inline.data.get(LINK_DATA_KEY_URL);
}

export function createLinkInline(type: string, url: string, text?: string): Inline {
  return Inline.fromJSON({
    type,
    data: Data.fromJSON({ [LINK_DATA_KEY_URL]: url }),
    nodes: text ? [Text.fromJSON({ text })] : undefined
  });
}

/**
 * @public
 */
export const linkIsActive: LinkQueryHas = editor => getQuery<LinkQueryHas>(editor, LINK_QUERY_HAS)();

/**
 * @public
 */
export const linkRemove: LinkCommandRemove = editor => getCommand<LinkCommandRemove>(editor, LINK_COMMAND_REMOVE)();

/**
 * @public
 */
export const linkSet: LinkCommandSet = (editor, url, text) =>
  getCommand<LinkCommandSet>(editor, LINK_COMMAND_SET)(url, text);
