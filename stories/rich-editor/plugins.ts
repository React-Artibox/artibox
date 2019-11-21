import { Plugin } from 'slate-react';
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  Strikethrough as StrikethroughIcon,
  Highlight as HighlightIcon,
  Link,
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
import { LinkPlugin, linkIsActive, linkSet, linkRemove } from '@artibox/slate-plugin-link';
import { Heading } from '@artibox/slate-heading';
import { Blockquote } from '@artibox/slate-blockquote';
import { List } from '@artibox/slate-list';
import { SeparationLine } from '@artibox/slate-separation-line';
import { Video } from '@artibox/slate-video';
import { Facebook } from '@artibox/slate-facebook';
import { Instagram } from '@artibox/slate-instagram';
import { InputBlockPlugin, INPUT_BLOCK_TYPE } from '@artibox/slate-plugin-input-block';
import { ToolbarPlugin, TOOLBAR_DIVIDER } from '@artibox/slate-toolbar';

const bold = Bold.create();
const italic = Italic.create();
const underline = Underline.create();
const strikethrough = Strikethrough.create();
const highlight = Highlight.create();
const heading = Heading.create({ disabled: [4, 5, 6] });
const blockquote = Blockquote.create();
const list = List.create();
const separationLine = SeparationLine.create();
const video = Video.create();
const instagram = Instagram.create();
const facebook = Facebook.create();

export const plugins: Plugin[] = [
  bold.plugin,
  italic.plugin,
  underline.plugin,
  strikethrough.plugin,
  highlight.plugin,
  LinkPlugin(),
  heading.plugin,
  blockquote.plugin,
  list.plugin,
  separationLine.plugin,
  video.plugin,
  instagram.plugin,
  facebook.plugin,
  InputBlockPlugin(),
  ToolbarPlugin({
    disabledBlocks: [INPUT_BLOCK_TYPE],
    expandedTools: [
      [BoldIcon, { isActive: bold.isBoldActive, onMouseDown: bold.toggleBoldMark }],
      [ItalicIcon, { isActive: italic.isItalicActive, onMouseDown: italic.toggleItalicMark }],
      [UnderlineIcon, { isActive: underline.isUnderlineActive, onMouseDown: underline.toggleUnderlineMark }],
      [
        StrikethroughIcon,
        {
          isActive: strikethrough.isStrikethroughActive,
          onMouseDown: strikethrough.toggleStrikethroughMark
        }
      ],
      TOOLBAR_DIVIDER,
      [HighlightIcon, { isActive: highlight.isHighlightActive, onMouseDown: highlight.toggleHighlightMark }],
      [
        Link,
        {
          isActive: linkIsActive,
          inputable: {
            onConfirm: linkSet
          }
        }
      ],
      [Unlink, { onMouseDown: linkRemove }]
    ],
    collapsedTools: [
      [
        Heading1,
        {
          isActive: editor => heading.isSelectionInHeading(editor, 1),
          onMouseDown: editor => heading.toggleHeadingBlock(editor, 1)
        }
      ],
      [
        Heading2,
        {
          isActive: editor => heading.isSelectionInHeading(editor, 2),
          onMouseDown: editor => heading.toggleHeadingBlock(editor, 2)
        }
      ],
      [
        Heading3,
        {
          isActive: editor => heading.isSelectionInHeading(editor, 3),
          onMouseDown: editor => heading.toggleHeadingBlock(editor, 3)
        }
      ],
      [
        BlockquoteIcon,
        {
          isActive: blockquote.isSelectionInBlockquote,
          onMouseDown: blockquote.toggleBlockquoteBlock
        }
      ],
      [UnorderedList, { onMouseDown: editor => list.toggleListBlock(editor, 'unordered') }],
      [OrderedList, { onMouseDown: editor => list.toggleListBlock(editor, 'ordered') }],
      TOOLBAR_DIVIDER,
      [SeparationLineIcon, { onMouseDown: separationLine.addSeparationLineBlock }],
      [VideoIcon, { inputable: { onConfirm: video.addVideoBlock } }],
      [InstagramIcon, { inputable: { onConfirm: instagram.addInstagramBlock } }],
      [FacebookIcon, { inputable: { onConfirm: facebook.addFacebookBlock } }]
    ]
  })
];
