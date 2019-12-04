import { Plugin } from 'slate-react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Highlight,
  Link,
  Unlink,
  Heading1,
  Heading2,
  Heading3,
  Blockquote,
  UnorderedList,
  OrderedList,
  SeparationLine,
  Video,
  Facebook,
  Instagram
} from '@artibox/icons';
import { createBold } from '@artibox/slate-bold';
import { createItalic } from '@artibox/slate-italic';
import { createUnderline } from '@artibox/slate-underline';
import { createStrikethrough } from '@artibox/slate-strikethrough';
import { createHighlight } from '@artibox/slate-highlight';
import { createLink } from '@artibox/slate-link';
import { createHeading } from '@artibox/slate-heading';
import { createBlockquote } from '@artibox/slate-blockquote';
import { createList } from '@artibox/slate-list';
import { createSeparationLine } from '@artibox/slate-separation-line';
import { createVideo } from '@artibox/slate-video';
import { createFacebook } from '@artibox/slate-facebook';
import { createInstagram } from '@artibox/slate-instagram';
import { createInputBlock } from '@artibox/slate-input-block';
import { Toolbar, TOOLBAR_DIVIDER } from '@artibox/slate-toolbar';

const bold = createBold();
const italic = createItalic();
const underline = createUnderline();
const strikethrough = createStrikethrough();
const highlight = createHighlight();
const link = createLink();
const heading = createHeading();
const blockquote = createBlockquote();
const list = createList();
const separationLine = createSeparationLine();
const video = createVideo();
const instagram = createInstagram();
const facebook = createFacebook();
const inputBlock = createInputBlock();

export const plugins: Plugin[] = [
  bold.forPlugin(),
  italic.forPlugin(),
  underline.forPlugin(),
  strikethrough.forPlugin(),
  highlight.forPlugin(),
  link.forPlugin(),
  heading.forPlugin({ disabled: [4, 5, 6] }),
  blockquote.forPlugin(),
  ...list.forPlugin(),
  separationLine.forPlugin(),
  video.forPlugin(),
  instagram.forPlugin(),
  facebook.forPlugin(),
  inputBlock.forPlugin(),
  Toolbar.forPlugin({
    disabledBlocks: [inputBlock.type],
    expandedTools: [
      { icon: Bold, hook: bold.forToolHook() },
      { icon: Italic, hook: italic.forToolHook() },
      { icon: Underline, hook: underline.forToolHook() },
      { icon: Strikethrough, hook: strikethrough.forToolHook() },
      { icon: Highlight, hook: highlight.forToolHook() },
      { icon: Link, hook: link.forToolHook() },
      { icon: Unlink, hook: link.forToolHook({ action: 'remove' }) }
    ],
    collapsedTools: [
      { icon: Heading1, hook: heading.forToolHook({ level: 1 }) },
      { icon: Heading2, hook: heading.forToolHook({ level: 2 }) },
      { icon: Heading3, hook: heading.forToolHook({ level: 3 }) },
      { icon: Blockquote, hook: blockquote.forToolHook() },
      { icon: UnorderedList, hook: list.forToolHook({ orderedType: 'unordered' }) },
      { icon: OrderedList, hook: list.forToolHook({ orderedType: 'ordered' }) },
      TOOLBAR_DIVIDER,
      { icon: SeparationLine, hook: separationLine.forToolHook() },
      { icon: Video, hook: video.forToolHook({ setToolInput: inputBlock.start }) },
      { icon: Instagram, hook: instagram.forToolHook({ setInputConfig: inputBlock.start }) },
      { icon: Facebook, hook: facebook.forToolHook({ setInputConfig: inputBlock.start }) }
    ]
  })
];
