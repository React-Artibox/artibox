import { boolean, select } from '@storybook/addon-knobs';

import React, { useState } from 'react';
import { Node } from 'slate';
import { THEME_ARTIBOX } from '@artibox/theme/artibox';
import { THEME_ARTIBOX_DARK } from '@artibox/theme/artibox-dark';
import { enUS } from '@artibox/locale/en-US';
import { zhTW } from '@artibox/locale/zh-TW';
import { PARAGRAPH_TYPE } from '@artibox/slate-common/paragraph';
import { ConfigsProvider } from '@artibox/slate-react/configs';
import { YoutubeEmbedStrategy } from '@artibox/slate-common/embed/strategies/youtube';
import { VimeoEmbedStrategy } from '@artibox/slate-common/embed/strategies/vimeo';
import { InstagramEmbedStrategy } from '@artibox/slate-common/embed/strategies/instagram';
import { FacebookEmbedStrategy } from '@artibox/slate-common/embed/strategies/facebook';
import { TwitterEmbedStrategy } from '@artibox/slate-common/embed/strategies/twitter';
import { defaultRenderYoutubeEmbedElement } from '@artibox/slate-react/embed/renderers/youtube';
import { defaultRenderVimeoEmbedElement } from '@artibox/slate-react/embed/renderers/vimeo';
import { defaultRenderInstagramEmbedElement } from '@artibox/slate-react/embed/renderers/instagram';
import { defaultRenderFacebookEmbedElement } from '@artibox/slate-react/embed/renderers/facebook';
import { defaultRenderTwitterEmbedElement } from '@artibox/slate-react/embed/renderers/twitter';

import { createJsxSerializer } from '@artibox/slate-react/jsx-serializer';
import { createJsxSerializeParagraph } from '@artibox/slate-react/paragraph/jsx-serializer';
import { createJsxSerializeBold } from '@artibox/slate-react/bold/jsx-serializer';
import { createJsxSerializeHighlight } from '@artibox/slate-react/highlight/jsx-serializer';
import { createJsxSerializeItalic } from '@artibox/slate-react/italic/jsx-serializer';
import { createJsxSerializeStrikethrough } from '@artibox/slate-react/strikethrough/jsx-serializer';
import { createJsxSerializeUnderline } from '@artibox/slate-react/underline/jsx-serializer';
import { createJsxSerializeBlockquote } from '@artibox/slate-react/blockquote/jsx-serializer';
import { createJsxSerializeDivider } from '@artibox/slate-react/divider/jsx-serializer';
import { createJsxSerializeEmbed } from '@artibox/slate-react/embed/jsx-serializer';
import { createJsxSerializeHeading } from '@artibox/slate-react/heading/jsx-serializer';
import { createJsxSerializeImage } from '@artibox/slate-react/image/jsx-serializer';
import { createJsxSerializeLink } from '@artibox/slate-react/link/jsx-serializer';
import { createJsxSerializeList } from '@artibox/slate-react/list/jsx-serializer';
import { createJsxSerializeReadMore } from '@artibox/slate-react/read-more/jsx-serializer';

import { customRenderBlockquote } from '../../custom-elements';
import PlaygroudEditor, { PlaygroudEditorProps } from '../../components/PlaygroudEditor';

export default {
  title: 'Serializers/Jsx'
};

const jsxSerializer = createJsxSerializer({
  leafs: [
    createJsxSerializeBold(),
    createJsxSerializeHighlight(),
    createJsxSerializeItalic(),
    createJsxSerializeStrikethrough(),
    createJsxSerializeUnderline()
  ],
  elements: [
    createJsxSerializeParagraph(),
    createJsxSerializeBlockquote({ render: customRenderBlockquote }),
    createJsxSerializeDivider(),
    createJsxSerializeEmbed({
      strategies: {
        youtube: YoutubeEmbedStrategy,
        vimeo: VimeoEmbedStrategy,
        instagram: InstagramEmbedStrategy,
        facebook: FacebookEmbedStrategy,
        twitter: TwitterEmbedStrategy
      },
      renderers: {
        youtube: defaultRenderYoutubeEmbedElement,
        vimeo: defaultRenderVimeoEmbedElement,
        instagram: defaultRenderInstagramEmbedElement,
        facebook: defaultRenderFacebookEmbedElement,
        twitter: defaultRenderTwitterEmbedElement
      }
    }),
    createJsxSerializeHeading(),
    createJsxSerializeImage(),
    createJsxSerializeLink(),
    createJsxSerializeList(),
    createJsxSerializeReadMore()
  ]
});

export const Example = () => {
  const theme = boolean('dark mode', false, 'editor') ? THEME_ARTIBOX_DARK : THEME_ARTIBOX;
  const locales = [enUS, zhTW];
  const localeNames = locales.map(({ locale }) => locale);
  const localeName = select('locale', localeNames, enUS.locale, 'editor');
  const locale = locales.find(({ locale: name }) => name === localeName)!;
  const Display = ({ theme, locale }: Pick<PlaygroudEditorProps, 'theme' | 'locale'>) => {
    const [value, setValue] = useState<Node[]>([
      {
        type: PARAGRAPH_TYPE,
        children: [{ text: '' }]
      }
    ]);

    return (
      <div className="stories__examples__playgroud__serializer-jsx">
        <PlaygroudEditor theme={theme} locale={locale} value={value} setValue={setValue} />
        <ConfigsProvider theme={theme} locale={locale}>
          {({
            theme: {
              props: { style }
            }
          }) => (
            <div className="stories__custom-elements" style={style}>
              {jsxSerializer.serialize(value)}
            </div>
          )}
        </ConfigsProvider>
      </div>
    );
  };

  return <Display theme={theme} locale={locale} />;
};
