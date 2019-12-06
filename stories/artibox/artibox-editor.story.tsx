import '@artibox/theme/artibox';
import '@artibox/theme/artibox-dark';

import React, { useState, useCallback } from 'react';
import { OnChangeFn } from 'slate-react';
import cx from 'classnames';
import { createArtiboxEditor } from '@artibox/slate-editor';
import { LocaleDefinition } from '@artibox/locale';
import { enUS } from '@artibox/locale/en-US';
import { zhTW } from '@artibox/locale/zh-TW';
import { addThemeNamePrefix } from '@artibox/components/theme';
import { initialValue } from './value';
import { plugins } from './plugins';
import ToggleButtons from './toggle-buttons';

const themes = [
  { value: 'artibox', label: 'Light' },
  { value: 'artibox-dark', label: 'Dark' }
];

const locales = [
  { value: zhTW, label: '中文' },
  { value: enUS, label: 'EN' }
];

const ArtiboxEditor = createArtiboxEditor({ plugins, defaultBlockComponent: 'p' });

interface ArtiboxEditorWithStateProps {
  theme?: string;
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
  const [theme, setTheme] = useState('artibox');

  return (
    <>
      <div className={cx('artibox-editor-story__settings', addThemeNamePrefix(theme))}>
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
