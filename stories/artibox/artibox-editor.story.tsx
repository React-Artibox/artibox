import { THEME_ARTIBOX } from '@artibox/theme/artibox';
import { THEME_ARTIBOX_DARK } from '@artibox/theme/artibox-dark';

import React, { useState, useCallback } from 'react';
import { OnChangeFn } from 'slate-react';
import { createArtiboxEditor } from '@artibox/slate-editor';
import { Theme } from '@artibox/theme';
import { LocaleDefinition } from '@artibox/locale';
import { enUS } from '@artibox/locale/en-US';
import { zhTW } from '@artibox/locale/zh-TW';
import { resolveThemeObjectToCSSProperties } from '@artibox/components';
import { initialValue } from './value';
import { plugins } from './plugins';
import ToggleButtons from './toggle-buttons';

const themes = [
  { value: THEME_ARTIBOX, label: 'Light' },
  { value: THEME_ARTIBOX_DARK, label: 'Dark' }
];

const locales = [
  { value: zhTW, label: '中文' },
  { value: enUS, label: 'EN' }
];

const ArtiboxEditor = createArtiboxEditor({ plugins, defaultBlockComponent: 'p' });

interface ArtiboxEditorWithStateProps {
  theme?: Theme;
  locale?: LocaleDefinition;
}

const ArtiboxEditorWithState = ({ theme, locale }: ArtiboxEditorWithStateProps) => {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback<OnChangeFn>(change => setValue(change.value), []);

  return (
    <ArtiboxEditor
      className="artibox-stories-elements artibox-editor-story"
      value={value}
      onChange={onChange}
      theme={theme}
      locale={locale}
    />
  );
};

export function ArtiboxEditorStory() {
  const [locale, setLocale] = useState(zhTW);
  const [theme, setTheme] = useState(THEME_ARTIBOX);

  return (
    <>
      <div className="artibox-editor-story__settings" style={resolveThemeObjectToCSSProperties(theme)}>
        <ToggleButtons value={theme} items={themes} onChange={setTheme} />
        <ToggleButtons value={locale} items={locales} onChange={setLocale} />
      </div>
      <ArtiboxEditorWithState theme={theme} locale={locale} />
    </>
  );
}

ArtiboxEditorStory.story = {
  name: 'Artibox Editor'
};
