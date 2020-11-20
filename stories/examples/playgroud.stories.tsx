import { boolean, select } from '@storybook/addon-knobs';

import React, { useState } from 'react';
import { Node } from 'slate';
import { THEME_ARTIBOX } from '@artibox/theme/artibox';
import { THEME_ARTIBOX_DARK } from '@artibox/theme/artibox-dark';
import { enUS } from '@artibox/locale/en-US';
import { zhTW } from '@artibox/locale/zh-TW';
import { PARAGRAPH_TYPE } from '@artibox/slate-common/paragraph';
import PlaygroudEditor, { PlaygroudEditorProps } from '../components/PlaygroudEditor';

export default {
  title: 'Examples/Playgroud'
};

export const All = () => {
  const theme = boolean('dark mode', false, 'editor') ? THEME_ARTIBOX_DARK : THEME_ARTIBOX;
  const locales = [enUS, zhTW];
  const localeNames = locales.map(({ locale }) => locale);
  const localeName = select('locale', localeNames, enUS.locale, 'editor');
  const locale = locales.find(({ locale: name }) => name === localeName)!;
  const Editor = ({ theme, locale }: Pick<PlaygroudEditorProps, 'theme' | 'locale'>) => {
    const [value, setValue] = useState<Node[]>([
      {
        type: PARAGRAPH_TYPE,
        children: [{ text: '' }]
      }
    ]);

    return <PlaygroudEditor theme={theme} locale={locale} value={value} setValue={setValue} />;
  };

  return <Editor theme={theme} locale={locale} />;
};
