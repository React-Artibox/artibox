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
  Video
} from '@artibox/icons';
import { BoldPlugin, isBoldActive, boldToggle } from '@artibox/slate-plugin-bold';
import { ItalicPlugin, isItalicActive, italicToggle } from '@artibox/slate-plugin-italic';
import { UnderlinePlugin, isUnderlineActive, underlineToggle } from '@artibox/slate-plugin-underline';
import { StrikethroughPlugin, isStrikethroughActive, strikethroughToggle } from '@artibox/slate-plugin-strikethrough';
import { HighlightPlugin, isHighlightActive, highlightToggle } from '@artibox/slate-plugin-highlight';
import { LinkPlugin, linkIsActive, linkSet, linkRemove } from '@artibox/slate-plugin-link';
import { HeadingPlugin, isHeadingActive, headingToggle } from '@artibox/slate-plugin-heading';
import { BlockquotePlugin, isBlockquoteActive, blockquoteToggle } from '@artibox/slate-plugin-blockquote';
import { ListPlugin, listToggle } from '@artibox/slate-plugin-list';
import { SeparationLinePlugin, separationLineAdd } from '@artibox/slate-plugin-separation-line';
import { VideoPlugin, videoAdd } from '@artibox/slate-plugin-video';
import { InputBlockPlugin, INPUT_BLOCK_TYPE } from '@artibox/slate-plugin-input-block';
import { ToolbarPlugin, TOOLBAR_DIVIDER } from '@artibox/slate-toolbar';

export const plugins: Plugin[] = [
  BoldPlugin(),
  ItalicPlugin(),
  UnderlinePlugin(),
  StrikethroughPlugin(),
  HighlightPlugin(),
  LinkPlugin(),
  HeadingPlugin({ disabled: [4, 5, 6] }),
  BlockquotePlugin(),
  ListPlugin(),
  SeparationLinePlugin(),
  VideoPlugin(),
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
      [Blockquote, { isActive: isBlockquoteActive, onMouseDown: blockquoteToggle }],
      [UnorderedList, { onMouseDown: editor => listToggle(editor, 'unordered') }],
      [OrderedList, { onMouseDown: editor => listToggle(editor, 'ordered') }],
      TOOLBAR_DIVIDER,
      [SeparationLine, { onMouseDown: separationLineAdd }],
      [Video, { inputable: { onConfirm: (editor, value) => videoAdd(editor, value, 'youtube') } }]
    ]
  })
];
