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
  Blockquote as BlockquoteIcon,
  UnorderedList,
  OrderedList,
  SeparationLine,
  Video,
  Facebook,
  Instagram
} from '@artibox/icons';
import { BoldPlugin, isBoldActive, boldToggle } from '@artibox/slate-plugin-bold';
import { ItalicPlugin, isItalicActive, italicToggle } from '@artibox/slate-plugin-italic';
import { UnderlinePlugin, isUnderlineActive, underlineToggle } from '@artibox/slate-plugin-underline';
import { StrikethroughPlugin, isStrikethroughActive, strikethroughToggle } from '@artibox/slate-plugin-strikethrough';
import { HighlightPlugin, isHighlightActive, highlightToggle } from '@artibox/slate-plugin-highlight';
import { LinkPlugin, linkIsActive, linkSet, linkRemove } from '@artibox/slate-plugin-link';
import { HeadingPlugin, isHeadingActive, headingToggle } from '@artibox/slate-plugin-heading';
import { Blockquote } from '@artibox/slate-blockquote';
import { ListPlugin, listToggle } from '@artibox/slate-plugin-list';
import { SeparationLinePlugin, separationLineAdd } from '@artibox/slate-plugin-separation-line';
import { VideoPlugin, videoAdd } from '@artibox/slate-plugin-video';
import { FacebookPlugin, facebookAdd } from '@artibox/slate-plugin-facebook';
import { InstagramPlugin, instagramAdd } from '@artibox/slate-plugin-instagram';
import { InputBlockPlugin, INPUT_BLOCK_TYPE } from '@artibox/slate-plugin-input-block';
import { ToolbarPlugin, TOOLBAR_DIVIDER } from '@artibox/slate-toolbar';

const blockquote = Blockquote.create();

export const plugins: Plugin[] = [
  BoldPlugin(),
  ItalicPlugin(),
  UnderlinePlugin(),
  StrikethroughPlugin(),
  HighlightPlugin(),
  LinkPlugin(),
  HeadingPlugin({ disabled: [4, 5, 6] }),
  blockquote.plugin,
  ListPlugin(),
  SeparationLinePlugin(),
  VideoPlugin(),
  InstagramPlugin(),
  FacebookPlugin(),
  InputBlockPlugin(),
  ToolbarPlugin({
    disabledBlocks: [INPUT_BLOCK_TYPE],
    expandedTools: [
      [Bold, { isActive: isBoldActive, onMouseDown: boldToggle }],
      [Italic, { isActive: isItalicActive, onMouseDown: italicToggle }],
      [Underline, { isActive: isUnderlineActive, onMouseDown: underlineToggle }],
      [Strikethrough, { isActive: isStrikethroughActive, onMouseDown: strikethroughToggle }],
      TOOLBAR_DIVIDER,
      [Highlight, { isActive: isHighlightActive, onMouseDown: highlightToggle }],
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
      [Heading1, { isActive: editor => isHeadingActive(editor, 1), onMouseDown: editor => headingToggle(editor, 1) }],
      [Heading2, { isActive: editor => isHeadingActive(editor, 2), onMouseDown: editor => headingToggle(editor, 2) }],
      [Heading3, { isActive: editor => isHeadingActive(editor, 3), onMouseDown: editor => headingToggle(editor, 3) }],
      [
        BlockquoteIcon,
        {
          isActive: editor => blockquote.utils.isSelectionInBlockquote(editor),
          onMouseDown: editor => blockquote.utils.toggleBlockquote(editor)
        }
      ],
      [UnorderedList, { onMouseDown: editor => listToggle(editor, 'unordered') }],
      [OrderedList, { onMouseDown: editor => listToggle(editor, 'ordered') }],
      TOOLBAR_DIVIDER,
      [SeparationLine, { onMouseDown: separationLineAdd }],
      [Video, { inputable: { onConfirm: videoAdd } }],
      [Instagram, { inputable: { onConfirm: instagramAdd } }],
      [Facebook, { inputable: { onConfirm: facebookAdd } }]
    ]
  })
];
