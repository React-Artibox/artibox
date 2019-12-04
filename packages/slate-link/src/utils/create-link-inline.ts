import { Inline, Text } from 'slate';

export function createLinkInline(type: string, url: string, text?: string): Inline {
  return Inline.fromJSON({
    type,
    data: { href: url },
    nodes: text ? [Text.fromJSON({ text })] : undefined
  });
}
