import React from 'react';
import { createJsxSerializer } from '@artibox/slate-jsx-serializer';
import { BOLD_TYPE } from '@artibox/slate-bold';
import { ITALIC_TYPE } from '@artibox/slate-italic';
import { UNDERLINE_TYPE } from '@artibox/slate-underline';
import { STRIKETHROUGH_TYPE } from '@artibox/slate-strikethrough';
import { HIGHLIGHT_TYPE } from '@artibox/slate-highlight';
import { LINK_TYPE, getUrlFromInline } from '@artibox/slate-link';
import { HEADING_TYPE, HEADING_COMPONENTS, getHeadingLevelFromBlock } from '@artibox/slate-heading';
import { BLOCKQUOTE_TYPE } from '@artibox/slate-blockquote';
import { LIST_TYPES } from '@artibox/slate-list';
import { SEPARATION_LINE_TYPE } from '@artibox/slate-separation-line';

export const jsxSerializer = createJsxSerializer({
  blocks: {
    [HEADING_TYPE]: (children, node) => {
      const level = getHeadingLevelFromBlock(node);

      if (!level) {
        return undefined;
      }

      const Component = HEADING_COMPONENTS[level];

      return <Component>{children}</Component>;
    },
    [BLOCKQUOTE_TYPE]: children => <blockquote>{children}</blockquote>,
    [LIST_TYPES.unordered]: children => <ul>{children}</ul>,
    [LIST_TYPES.ordered]: children => <ol>{children}</ol>,
    [LIST_TYPES.item]: children => <li>{children}</li>,
    [SEPARATION_LINE_TYPE]: () => <hr />
  },
  inlines: {
    [LINK_TYPE]: (children, node) => (
      <a href={getUrlFromInline(node)} target="_blank">
        {children}
      </a>
    )
  },
  marks: {
    [BOLD_TYPE]: children => <strong>{children}</strong>,
    [ITALIC_TYPE]: children => <i>{children}</i>,
    [UNDERLINE_TYPE]: children => <u>{children}</u>,
    [STRIKETHROUGH_TYPE]: children => <del>{children}</del>,
    [HIGHLIGHT_TYPE]: children => <mark>{children}</mark>
  }
});
