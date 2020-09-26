import { createJsxSerializer } from '@artibox/slate-jsx-serializer';
import { createBoldJsxSerializerRule } from '@artibox/slate-bold';
import { createItalicJsxSerializerRule } from '@artibox/slate-italic';
import { createUnderlineJsxSerializerRule } from '@artibox/slate-underline';
import { createStrikethroughJsxSerializerRule } from '@artibox/slate-strikethrough';
import { createHighlightJsxSerializerRule } from '@artibox/slate-highlight';
import { createLinkJsxSerializerRule } from '@artibox/slate-link';
import { createHeadingJsxSerializerRule } from '@artibox/slate-heading';
import { createBlockquoteJsxSerializerRule } from '@artibox/slate-blockquote';
import { createListJsxSerializerRules } from '@artibox/slate-list';
import { createSeparationLineJsxSerializerRule } from '@artibox/slate-separation-line';
import { createImageJsxSerializerRules } from '@artibox/slate-image';
import { createVideoJsxSerializerRule } from '@artibox/slate-video';
import { createInstagramJsxSerializerRule } from '@artibox/slate-instagram';
import { createFacebookJsxSerializerRule } from '@artibox/slate-facebook';

/**
 * custom components
 */
import CustomBlockquote from './components/blockquote';

export const jsxSerializer = createJsxSerializer({
  defaultBlockComponent: 'p',
  blocks: [
    createHeadingJsxSerializerRule(),
    createBlockquoteJsxSerializerRule({ component: CustomBlockquote }),
    ...createListJsxSerializerRules(),
    createSeparationLineJsxSerializerRule(),
    ...createImageJsxSerializerRules({
      figure: {
        component: 'figure'
      },
      caption: {
        component: 'figcaption'
      },
      hostingResolvers: {
        GCLOUD_STORAGE: name => `<Your Public Url>/${name}`
      }
    }),
    createVideoJsxSerializerRule(),
    createInstagramJsxSerializerRule(),
    createFacebookJsxSerializerRule()
  ],
  inlines: [createLinkJsxSerializerRule()],
  marks: [
    createBoldJsxSerializerRule(),
    createItalicJsxSerializerRule(),
    createUnderlineJsxSerializerRule(),
    createStrikethroughJsxSerializerRule(),
    createHighlightJsxSerializerRule()
  ]
});
