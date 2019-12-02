import React, { useState, useCallback, FC } from 'react';
import { OnChangeFn } from 'slate-react';
import cx from 'classnames';
import { createArtiboxEditor } from '@artibox/slate-editor';
import { LocaleDefinition } from '@artibox/locale';
import { enUS } from '@artibox/locale/en-US';
import { zhTW } from '@artibox/locale/zh-TW';
import { initialValue } from './value';
import { plugins } from './plugins';
import './rich-editor.scss';

interface LocaleButtonProps {
  active: boolean;
  locale: LocaleDefinition;
  setLocale: (locale: LocaleDefinition) => void;
}

const LocaleButton: FC<LocaleButtonProps> = ({ children, active, locale, setLocale }) => (
  <button
    className={cx('rich-editor__locale__button', { 'rich-editor__locale__button--active': active })}
    onClick={() => setLocale(locale)}
  >
    {children}
  </button>
);

const ArtiboxEditor = createArtiboxEditor({ plugins });

export function RichEditor() {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback<OnChangeFn>(change => setValue(change.value), []);
  const [locale, setLocale] = useState(zhTW);

  return (
    <>
      <div className="rich-editor__locale">
        <LocaleButton active={locale === zhTW} locale={zhTW} setLocale={setLocale}>
          中文
        </LocaleButton>
        <LocaleButton active={locale === enUS} locale={enUS} setLocale={setLocale}>
          EN
        </LocaleButton>
      </div>
      <ArtiboxEditor className="rich-editor" value={value} onChange={onChange} locale={locale} theme="artibox" />
    </>
  );
}
