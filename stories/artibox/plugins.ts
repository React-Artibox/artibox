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
import { createImage } from '@artibox/slate-image';
import { createVideo } from '@artibox/slate-video';
import { createFacebook } from '@artibox/slate-facebook';
import { createInstagram } from '@artibox/slate-instagram';
import { createInputBlock } from '@artibox/slate-input-block';
import { Toolbar, TOOLBAR_DIVIDER } from '@artibox/slate-toolbar';

/**
 * custom components
 */
import CustomBlockquote from './components/blockquote';

export const InputBlock = createInputBlock();
export const Bold = createBold();
export const Italic = createItalic();
export const Underline = createUnderline();
export const Strikethrough = createStrikethrough();
export const Highlight = createHighlight();
export const Link = createLink();
export const Heading = createHeading();
export const Blockquote = createBlockquote();
export const List = createList();
export const SeparationLine = createSeparationLine();
export const Image = createImage({
  thresholds: [25, 50, 75]
});
export const Video = createVideo();
export const Instagram = createInstagram();
export const Facebook = createFacebook();

export const plugins: Plugin[] = [
  InputBlock.forPlugin(),
  Bold.forPlugin(),
  Italic.forPlugin(),
  Underline.forPlugin(),
  Strikethrough.forPlugin(),
  Highlight.forPlugin(),
  Link.forPlugin(),
  Heading.forPlugin({ disabled: [4, 5, 6] }),
  Blockquote.forPlugin({ component: CustomBlockquote }),
  ...List.forPlugin(),
  SeparationLine.forPlugin(),
  Image.forPlugin(),
  Video.forPlugin(),
  Instagram.forPlugin(),
  Facebook.forPlugin(),
  Toolbar.forPlugin({
    disabledBlocks: [InputBlock.type],
    disabledInlines: [Image.type],
    expandedTools: [
      { icon: BoldIcon, hook: Bold.forToolHook() },
      { icon: ItalicIcon, hook: Italic.forToolHook() },
      { icon: UnderlineIcon, hook: Underline.forToolHook() },
      { icon: StrikethroughIcon, hook: Strikethrough.forToolHook() },
      { icon: HighlightIcon, hook: Highlight.forToolHook() },
      { icon: LinkIcon, hook: Link.forToolHook() },
      { icon: Unlink, hook: Link.forToolHook({ command: 'remove' }) }
    ],
    collapsedTools: [
      { icon: Heading1, hook: Heading.forToolHook({ level: 1 }) },
      { icon: Heading2, hook: Heading.forToolHook({ level: 2 }) },
      { icon: Heading3, hook: Heading.forToolHook({ level: 3 }) },
      { icon: BlockquoteIcon, hook: Blockquote.forToolHook() },
      { icon: UnorderedList, hook: List.forToolHook({ orderedType: 'unordered' }) },
      { icon: OrderedList, hook: List.forToolHook({ orderedType: 'ordered' }) },
      TOOLBAR_DIVIDER,
      { icon: SeparationLineIcon, hook: SeparationLine.forToolHook() },
      { icon: VideoIcon, hook: Video.forToolHook({ setInputConfig: InputBlock.start }) },
      { icon: InstagramIcon, hook: Instagram.forToolHook({ setInputConfig: InputBlock.start }) },
      { icon: FacebookIcon, hook: Facebook.forToolHook({ setInputConfig: InputBlock.start }) }
    ]
  })
];
