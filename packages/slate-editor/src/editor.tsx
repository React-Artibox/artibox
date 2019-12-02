import '@artibox/theme/default';
import React from 'react';
import { Editor, EditorProps, Plugin } from 'slate-react';
import cx from 'classnames';
import { ThemeProvider } from '@artibox/components/theme';
import { LocaleProvider } from '@artibox/components/locale';
import { LocaleDefinition } from '@artibox/locale';
import { placeholder } from './placeholder';
import './styles';

export interface CreateArtiboxEditorConfig {
  plugins?: Plugin[];
}

export interface ArtiboxEditorProps extends Omit<EditorProps, keyof CreateArtiboxEditorConfig> {
  locale?: LocaleDefinition;
  theme?: string;
}

export function createArtiboxEditor(config: CreateArtiboxEditorConfig) {
  let { plugins } = config;
  plugins = [placeholder, ...plugins];

  function ArtiboxEditor({ theme, locale, className, ...props }: ArtiboxEditorProps) {
    return (
      <LocaleProvider locale={locale}>
        <ThemeProvider theme={theme}>
          {themeName => <Editor className={cx('artibox-editor', themeName, className)} plugins={plugins} {...props} />}
        </ThemeProvider>
      </LocaleProvider>
    );
  }

  return ArtiboxEditor;
}
