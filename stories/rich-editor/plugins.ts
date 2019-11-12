import { Plugin } from 'slate-react';
import {
  Bold,
  Italic,
  Strikethrough,
  Underline,
  Highlight,
  Link,
  Heading1,
  Heading2,
  SeparationLine,
  Blockquote
} from '@artibox/icons';
import { BoldPlugin, useBoldIsActive, useBoldOnMouseDown } from '@artibox/slate-plugin-bold';
import { ItalicPlugin, useItalicIsActive, useItalicOnMouseDown } from '@artibox/slate-plugin-italic';
import {
  StrikethroughPlugin,
  useStrikethroughIsActive,
  useStrikethroughOnMouseDown
} from '@artibox/slate-plugin-strikethrough';
import { UnderlinePlugin, useUnderlineIsActive, useUnderlineOnMouseDown } from '@artibox/slate-plugin-underline';
import { HighlightPlugin, useHighlightIsActive, useHighlightOnMouseDown } from '@artibox/slate-plugin-highlight';
import { LinkPlugin, useLinkModalOpenModal, useLinkIsActive } from '@artibox/slate-plugin-link';
import { HeadingPlugin, useHeadingIsActive, useHeadingOnMouseDown } from '@artibox/slate-plugin-heading';
import { SeparationLinePlugin, useSeparationLineOnMouseDown } from '@artibox/slate-plugin-separation-line';
import { BlockquotePlugin, useBlockquoteIsActive, useBlockquoteOnMouseDown } from '@artibox/slate-plugin-blockquote';
import { ToolbarPlugin, TOOLBAR_DIVIDER } from '@artibox/slate-toolbar';

export const plugins: Plugin[] = [
  BoldPlugin(),
  ItalicPlugin(),
  StrikethroughPlugin(),
  UnderlinePlugin(),
  HighlightPlugin(),
  LinkPlugin(),
  HeadingPlugin({
    disabled: [3, 4, 5, 6]
  }),
  SeparationLinePlugin(),
  BlockquotePlugin(),
  ToolbarPlugin({
    collapsedTools: [
      [Heading1, [editor => useHeadingOnMouseDown(editor, 1), editor => useHeadingIsActive(editor, 1)]],
      [Heading2, [editor => useHeadingOnMouseDown(editor, 2), editor => useHeadingIsActive(editor, 2)]],
      [Blockquote, [useBlockquoteOnMouseDown, useBlockquoteIsActive]],
      TOOLBAR_DIVIDER,
      [SeparationLine, [useSeparationLineOnMouseDown]],
      [Link, [useLinkModalOpenModal, useLinkIsActive]]
    ],
    expandedTools: [
      [Bold, [useBoldOnMouseDown, useBoldIsActive]],
      [Italic, [useItalicOnMouseDown, useItalicIsActive]],
      [Strikethrough, [useStrikethroughOnMouseDown, useStrikethroughIsActive]],
      [Underline, [useUnderlineOnMouseDown, useUnderlineIsActive]],
      [Highlight, [useHighlightOnMouseDown, useHighlightIsActive]],
      [Link, [useLinkModalOpenModal, useLinkIsActive]]
    ]
  })
];
