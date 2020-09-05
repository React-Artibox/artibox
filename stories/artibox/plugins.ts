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
  Image as ImageIcon,
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
import { createFileUploader } from '@artibox/slate-file-uploader';
import { SoftBreak } from '@artibox/slate-soft-break';
import { Tool, Toolbar, TOOLBAR_DIVIDER } from '@artibox/slate-toolbar';

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
  thresholds: [25, 50, 75],
  hostingResolvers: {
    GCLOUD_STORAGE: name => `<Your Public Url>/${name}`
  }
});
export const Video = createVideo();
export const Instagram = createInstagram();
export const Facebook = createFacebook();
/**
 * @example
 * Use gcloud storage.
 */
export const FileUploader = createFileUploader({
  accept: ['image/*'],
  createNode: {
    image: {
      dataURL: dataURL => Image.createBlock(dataURL, 'GCLOUD_STORAGE'),
      response: response => Image.createBlock(JSON.parse(response).name, 'GCLOUD_STORAGE')
    }
  },
  headers: file => ({
    Authorization: 'Bearer <Your OAuth2 Token>',
    'Content-Type': file.type
  }),
  url: file =>
    `https://storage.googleapis.com/upload/storage/v1/b/<Your Bucket Name>/o?uploadType=media&name=${file.name}`
});

const BoldTool: Tool = { icon: BoldIcon, hook: Bold.forToolHook() };
const ItalicTool: Tool = { icon: ItalicIcon, hook: Italic.forToolHook() };
const UnderlineTool: Tool = { icon: UnderlineIcon, hook: Underline.forToolHook() };
const StrikethroughTool: Tool = { icon: StrikethroughIcon, hook: Strikethrough.forToolHook() };
const HighlightTool: Tool = { icon: HighlightIcon, hook: Highlight.forToolHook() };
const LinkTool: Tool = { icon: LinkIcon, hook: Link.forToolHook() };
const UnlinkTool: Tool = { icon: Unlink, hook: Link.forToolHook({ command: 'remove' }) };
const Heading1Tool: Tool = { icon: Heading1, hook: Heading.forToolHook({ level: 1 }) };
const Heading2Tool: Tool = { icon: Heading2, hook: Heading.forToolHook({ level: 2 }) };
const Heading3Tool: Tool = { icon: Heading3, hook: Heading.forToolHook({ level: 3 }) };
const BlockquoteTool: Tool = { icon: BlockquoteIcon, hook: Blockquote.forToolHook() };
const UnorderedListTool: Tool = { icon: UnorderedList, hook: List.forToolHook({ orderedType: 'unordered' }) };
const OrderedListTool: Tool = { icon: OrderedList, hook: List.forToolHook({ orderedType: 'ordered' }) };
const SeparationLineTool: Tool = { icon: SeparationLineIcon, hook: SeparationLine.forToolHook() };
const ImageTool: Tool = { icon: ImageIcon, hook: FileUploader.forToolHook() };
const VideooTool: Tool = { icon: VideoIcon, hook: Video.forToolHook({ setInputConfig: InputBlock.start }) };
const InstagramTool: Tool = { icon: InstagramIcon, hook: Instagram.forToolHook({ setInputConfig: InputBlock.start }) };
const FacebookTool: Tool = { icon: FacebookIcon, hook: Facebook.forToolHook({ setInputConfig: InputBlock.start }) };

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
  FileUploader.forPlugin(),
  SoftBreak.forPlugin(),
  Toolbar.forPlugin({
    disabledBlocks: [InputBlock.type],
    expandedTools: [BoldTool, ItalicTool, UnderlineTool, StrikethroughTool, HighlightTool, LinkTool, UnlinkTool],
    collapsedTools: editor => {
      if (Blockquote.isSelectionIn(editor)) {
        return [BlockquoteTool];
      }

      return [
        Heading1Tool,
        Heading2Tool,
        Heading3Tool,
        BlockquoteTool,
        UnorderedListTool,
        OrderedListTool,
        TOOLBAR_DIVIDER,
        SeparationLineTool,
        ImageTool,
        VideooTool,
        InstagramTool,
        FacebookTool
      ];
    }
  })
];
