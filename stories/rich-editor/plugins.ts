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
      [BoldIcon, { isActive: bold.isSelectionIn, onMouseDown: bold.toggle }],
      [ItalicIcon, { isActive: italic.isSelectionIn, onMouseDown: italic.toggle }],
      [UnderlineIcon, { isActive: underline.isSelectionIn, onMouseDown: underline.toggle }],
      [StrikethroughIcon, { isActive: strikethrough.isSelectionIn, onMouseDown: strikethrough.toggle }],
      TOOLBAR_DIVIDER,
      [HighlightIcon, { isActive: highlight.isSelectionIn, onMouseDown: highlight.toggle }],
      [LinkIcon, { isActive: link.isSelectionIn, inputable: { onConfirm: link.set } }],
      [Unlink, { onMouseDown: link.remove }]
    ],
    collapsedTools: [
      [
        Heading1,
        {
          isActive: editor => heading.isSelectionIn(editor, 1),
          onMouseDown: editor => heading.toggle(editor, 1)
        }
      ],
      [
        Heading2,
        {
          isActive: editor => heading.isSelectionIn(editor, 2),
          onMouseDown: editor => heading.toggle(editor, 2)
        }
      ],
      [
        Heading3,
        {
          isActive: editor => heading.isSelectionIn(editor, 3),
          onMouseDown: editor => heading.toggle(editor, 3)
        }
      ],
      [BlockquoteIcon, { isActive: blockquote.isSelectionIn, onMouseDown: blockquote.toggle }],
      [UnorderedList, { onMouseDown: editor => list.toggle(editor, 'unordered') }],
      [OrderedList, { onMouseDown: editor => list.toggle(editor, 'ordered') }],
      TOOLBAR_DIVIDER,
      [SeparationLineIcon, { onMouseDown: separationLine.add }],
      [VideoIcon, { inputable: { onStart: inputBlock.start, onConfirm: video.add } }],
      [InstagramIcon, { inputable: { onStart: inputBlock.start, onConfirm: instagram.add } }],
      [FacebookIcon, { inputable: { onStart: inputBlock.start, onConfirm: facebook.add } }]
    ]
  })
];
