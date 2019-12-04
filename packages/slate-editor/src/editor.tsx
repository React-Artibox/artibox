import React from 'react';
import { Editor, EditorProps, Plugin } from 'slate-react';
import cx from 'classnames';
import { RendererBaseComponent } from '@artibox/slate-common';
import { createParagraphRenderer } from '@artibox/slate-common/renderers/paragraph';
import { ThemeProvider } from '@artibox/components/theme';
import { LocaleProvider } from '@artibox/components/locale';
import { LocaleDefinition } from '@artibox/locale';
import { placeholder } from './placeholder';
import './styles';

export interface CreateArtiboxEditorConfig {
  defaultBlockComponent?: RendererBaseComponent;
  plugins?: Plugin[];
}

export interface ArtiboxEditorProps extends Omit<EditorProps, keyof CreateArtiboxEditorConfig> {
  locale?: LocaleDefinition;
  theme?: string;
}

export function createArtiboxEditor(config: CreateArtiboxEditorConfig) {
  const { defaultBlockComponent = 'div' } = config;
  let { plugins = [] } = config;
  plugins = [placeholder, createParagraphRenderer(defaultBlockComponent), ...plugins];

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
