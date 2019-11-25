import { Plugin } from 'slate-react';
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  Strikethrough as StrikethroughIcon,
  Highlight as HighlightIcon,
  Link as LinkIcon,
  Unlink,
  Heading1,
  Heading2,
  Heading3,
  Blockquote as BlockquoteIcon,
  UnorderedList,
  OrderedList,
  SeparationLine as SeparationLineIcon,
  Video as VideoIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon
} from '@artibox/icons';
import { Bold } from '@artibox/slate-bold';
import { Italic } from '@artibox/slate-italic';
import { Underline } from '@artibox/slate-underline';
import { Strikethrough } from '@artibox/slate-strikethrough';
import { Highlight } from '@artibox/slate-highlight';
import { Link } from '@artibox/slate-link';
import { Heading } from '@artibox/slate-heading';
import { Blockquote } from '@artibox/slate-blockquote';
import { List } from '@artibox/slate-list';
import { SeparationLine } from '@artibox/slate-separation-line';
import { Video } from '@artibox/slate-video';
import { Facebook } from '@artibox/slate-facebook';
import { Instagram } from '@artibox/slate-instagram';
import { InputBlock } from '@artibox/slate-input-block';
import { ToolbarPlugin, TOOLBAR_DIVIDER } from '@artibox/slate-toolbar';

const bold = Bold.create();
const italic = Italic.create();
const underline = Underline.create();
const strikethrough = Strikethrough.create();
const highlight = Highlight.create();
const link = Link.create();
const heading = Heading.create();
const blockquote = Blockquote.create();
const list = List.create();
const separationLine = SeparationLine.create();
const video = Video.create();
const instagram = Instagram.create();
const facebook = Facebook.create();
const inputBlock = InputBlock.create();

export const plugins: Plugin[] = [
  bold.forPlugin(),
  italic.forPlugin(),
  underline.forPlugin(),
  strikethrough.forPlugin(),
  highlight.forPlugin(),
  link.forPlugin(),
  heading.forPlugin({ disabled: [4, 5, 6] }),
  blockquote.forPlugin(),
  list.forPlugin(),
  separationLine.forPlugin(),
  video.forPlugin(),
  instagram.forPlugin(),
  facebook.forPlugin(),
  inputBlock.forPlugin(),
  ToolbarPlugin({
    disabledBlocks: [inputBlock.type],
    expandedTools: [
      { icon: BoldIcon, hook: bold.forToolHook() },
      { icon: ItalicIcon, hook: italic.forToolHook() },
      { icon: UnderlineIcon, hook: underline.forToolHook() },
      { icon: StrikethroughIcon, hook: strikethrough.forToolHook() },
      { icon: HighlightIcon, hook: highlight.forToolHook() },
      { icon: LinkIcon, hook: link.forToolHook() },
      { icon: Unlink, hook: link.forToolHook({ action: 'remove' }) }
    ],
    collapsedTools: [
      { icon: Heading1, hook: heading.forToolHook({ level: 1 }) },
      { icon: Heading2, hook: heading.forToolHook({ level: 2 }) },
      { icon: Heading3, hook: heading.forToolHook({ level: 3 }) },
      { icon: BlockquoteIcon, hook: blockquote.forToolHook() },
      { icon: UnorderedList, hook: list.forToolHook({ orderedType: 'unordered' }) },
      { icon: OrderedList, hook: list.forToolHook({ orderedType: 'ordered' }) },
      TOOLBAR_DIVIDER,
      { icon: SeparationLineIcon, hook: separationLine.forToolHook() },
      { icon: VideoIcon, hook: video.forToolHook({ setToolInput: inputBlock.start }) },
      { icon: InstagramIcon, hook: instagram.forToolHook({ setToolInput: inputBlock.start }) },
      { icon: FacebookIcon, hook: facebook.forToolHook({ setToolInput: inputBlock.start }) }
    ]
  })
];
