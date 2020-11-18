import { text } from '@storybook/addon-knobs';

import React, { useMemo, useState } from 'react';
import { Node } from 'slate';
import THEME_ARTIBOX from '@artibox/theme/artibox';
import {
  Video as VideoIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon
} from '@artibox/icons';
import { Artibox, Editable, createReactEditor, composeRenderElements } from '@artibox/slate-react';
import { PARAGRAPH_TYPE } from '@artibox/slate-react/paragraph';
import { EMBED_TYPE, createReactEmbed } from '@artibox/slate-react/embed';
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
import { EmbedToolbarIcon } from '@artibox/slate-react/embed/toolbar';
import { Toolbar } from '@artibox/slate-react/toolbar';

export default {
  title: 'Elements/Embed'
};

export const Example = () => {
  const type = text('type', EMBED_TYPE);
  const embed = createReactEmbed({
    type,
    strategies: {
      youtube: YoutubeEmbedStrategy,
      vimeo: VimeoEmbedStrategy,
      instagram: InstagramEmbedStrategy,
      facebook: FacebookEmbedStrategy,
      twitter: TwitterEmbedStrategy
    }
  });
  const renderElement = composeRenderElements([
    embed.createRenderElement({
      youtube: defaultRenderYoutubeEmbedElement,
      vimeo: defaultRenderVimeoEmbedElement,
      instagram: defaultRenderInstagramEmbedElement,
      facebook: defaultRenderFacebookEmbedElement,
      twitter: defaultRenderTwitterEmbedElement
    })
  ]);
  const initialValues: Node[] = [
    {
      type: PARAGRAPH_TYPE,
      children: [
        {
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
        }
      ]
    },
    {
      type: embed.type,
      children: [
        {
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
        }
      ]
    }
  ];

  const Editor = () => {
    const [value, setValue] = useState(initialValues);
    const editor = useMemo(() => embed.with(createReactEditor()), []);

    return (
      <Artibox editor={editor} theme={THEME_ARTIBOX} onChange={setValue} value={value}>
        <Toolbar>
          {() => (
            <>
              <EmbedToolbarIcon
                icon={VideoIcon}
                controller={embed}
                providers={['youtube', 'vimeo']}
                getPlaceholder={locale => locale.editor.video.inputPlaceholder}
              />
              <EmbedToolbarIcon
                icon={InstagramIcon}
                controller={embed}
                providers={['instagram']}
                getPlaceholder={locale => locale.editor.instagram.inputPlaceholder}
              />
              <EmbedToolbarIcon
                icon={FacebookIcon}
                controller={embed}
                providers={['facebook']}
                getPlaceholder={locale => locale.editor.facebook.inputPlaceholder}
              />
              <EmbedToolbarIcon
                icon={TwitterIcon}
                controller={embed}
                providers={['twitter']}
                getPlaceholder={locale => locale.editor.twitter.tweet.inputPlaceholder}
              />
            </>
          )}
        </Toolbar>
        <Editable className="stories__custom-elements stories__editable" renderElement={renderElement} />
      </Artibox>
    );
  };

  return <Editor />;
};
