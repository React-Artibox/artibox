import { Editor, Plugin, Inline } from 'slate';
import { LINK_QUERY_URL, LINK_QUERY_HAS } from './link.constants';
import { getUrlFromInline } from './link.utils';

export type LinkQueryUrl = (editor: Editor) => string | undefined;

export type LinkQueryHas = (editor: Editor) => boolean;

export type LinkQueries = Plugin['queries'] & {
  [LINK_QUERY_URL]: LinkQueryUrl;
  [LINK_QUERY_HAS]: LinkQueryHas;
};

export function LinkQueries(type: string): LinkQueries {
  const queryUrl: LinkQueryUrl = editor => {
    const linkInline = editor.value.inlines.filter(inline => inline?.type === type).first() as Inline | null;
    return linkInline ? getUrlFromInline(linkInline) : undefined;
  };
  const queryHas: LinkQueryHas = editor => !!queryUrl(editor);

  return {
    [LINK_QUERY_URL]: queryUrl,
    [LINK_QUERY_HAS]: queryHas
  };
}
