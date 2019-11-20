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
  Video,
  Facebook,
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
import { ListPlugin, listToggle } from '@artibox/slate-plugin-list';
import { SeparationLine } from '@artibox/slate-separation-line';
import { VideoPlugin, videoAdd } from '@artibox/slate-plugin-video';
import { FacebookPlugin, facebookAdd } from '@artibox/slate-plugin-facebook';
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
const separationLine = SeparationLine.create();
const instagram = Instagram.create();

export const plugins: Plugin[] = [
  bold.plugin,
  italic.plugin,
  underline.plugin,
  strikethrough.plugin,
  highlight.plugin,
  LinkPlugin(),
  heading.plugin,
  blockquote.plugin,
  ListPlugin(),
  separationLine.plugin,
  VideoPlugin(),
  instagram.plugin,
  FacebookPlugin(),
  InputBlockPlugin(),
  ToolbarPlugin({
    disabledBlocks: [INPUT_BLOCK_TYPE],
    expandedTools: [
      [BoldIcon, { isActive: bold.utils.isBoldActive, onMouseDown: bold.utils.toggleBoldMark }],
      [ItalicIcon, { isActive: italic.utils.isItalicIsActive, onMouseDown: italic.utils.toggleItalicMark }],
      [
        UnderlineIcon,
        { isActive: underline.utils.isUnderlineActive, onMouseDown: underline.utils.toggleUnderlineMark }
      ],
      [
        StrikethroughIcon,
        {
          isActive: strikethrough.utils.isStrikethroughActive,
          onMouseDown: strikethrough.utils.toggleStrikethroughMark
        }
      ],
      TOOLBAR_DIVIDER,
      [
        HighlightIcon,
        { isActive: highlight.utils.isHighlightActive, onMouseDown: highlight.utils.toggleHighlightMark }
      ],
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
          isActive: editor => heading.utils.isSelectionInHeading(editor, 1),
          onMouseDown: editor => heading.utils.toggleHeadingBlock(editor, 1)
        }
      ],
      [
        Heading2,
        {
          isActive: editor => heading.utils.isSelectionInHeading(editor, 2),
          onMouseDown: editor => heading.utils.toggleHeadingBlock(editor, 2)
        }
      ],
      [
        Heading3,
        {
          isActive: editor => heading.utils.isSelectionInHeading(editor, 3),
          onMouseDown: editor => heading.utils.toggleHeadingBlock(editor, 3)
        }
      ],
      [
        BlockquoteIcon,
        {
          isActive: blockquote.utils.isSelectionInBlockquote,
          onMouseDown: blockquote.utils.toggleBlockquote
        }
      ],
      [UnorderedList, { onMouseDown: editor => listToggle(editor, 'unordered') }],
      [OrderedList, { onMouseDown: editor => listToggle(editor, 'ordered') }],
      TOOLBAR_DIVIDER,
      [SeparationLineIcon, { onMouseDown: separationLine.utils.addSeparationLine }],
      [Video, { inputable: { onConfirm: videoAdd } }],
      [InstagramIcon, { inputable: { onConfirm: instagram.utils.addInstagramBlock } }],
      [Facebook, { inputable: { onConfirm: facebookAdd } }]
    ]
  })
];
