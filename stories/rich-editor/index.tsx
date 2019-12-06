import '@artibox/theme/artibox';
import '@artibox/theme/artibox-dark';

import React, { useState, useCallback, useMemo } from 'react';
import { OnChangeFn } from 'slate-react';
import cx from 'classnames';
import { createArtiboxEditor } from '@artibox/slate-editor';
import { enUS } from '@artibox/locale/en-US';
import { zhTW } from '@artibox/locale/zh-TW';
import { addThemeNamePrefix } from '@artibox/components/theme';
import { initialValue } from './value';
import { plugins } from './plugins';
import ToggleButtons from './toggle-buttons';
import './rich-editor.scss';

const themes = [
  { value: 'artibox', label: 'Light' },
  { value: 'artibox-dark', label: 'Dark' }
];

const locales = [
  { value: zhTW, label: '中文' },
  { value: enUS, label: 'EN' }
];

const ArtiboxEditor = createArtiboxEditor({ plugins });

export function RichEditor() {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback<OnChangeFn>(change => setValue(change.value), []);
  const [locale, setLocale] = useState(zhTW);
  const [theme, setTheme] = useState('artibox');
  const settings = useMemo(
    () => (
      <div className={cx('rich-editor__settings', addThemeNamePrefix(theme))}>
        <ToggleButtons value={theme} items={themes} onChange={setTheme} />
        <ToggleButtons value={locale} items={locales} onChange={setLocale} />
      </div>
    ),
    [theme, locale]
  );

  return (
    <>
      {settings}
      <ArtiboxEditor className="rich-editor" value={value} onChange={onChange} theme={theme} locale={locale} />
    </>
  );
}
