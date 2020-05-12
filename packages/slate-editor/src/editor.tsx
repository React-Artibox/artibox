import React from 'react';
import { Editor, EditorProps, Plugin } from 'slate-react';
import cx from 'classnames';
import { RendererBaseComponentWithAttributes } from '@artibox/slate-common';
import { createParagraphRenderer } from '@artibox/slate-common/renderers/paragraph';
import { Theme } from '@artibox/theme';
import { ThemeProvider } from '@artibox/components/theme';
import { LocaleProvider } from '@artibox/components/locale';
import { LocaleDefinition } from '@artibox/locale';
import { placeholder } from './placeholder';
import './styles';

export interface CreateArtiboxEditorConfig {
  defaultBlockComponent?: RendererBaseComponentWithAttributes;
  plugins?: Plugin[];
}

export interface ArtiboxEditorProps extends Omit<EditorProps, keyof CreateArtiboxEditorConfig> {
  locale?: LocaleDefinition;
  theme?: Theme;
}

export function createArtiboxEditor(config?: CreateArtiboxEditorConfig) {
  const { defaultBlockComponent = 'div' } = config || {};
  let { plugins = [] } = config || {};
  plugins = [placeholder, createParagraphRenderer(defaultBlockComponent), ...plugins];

  function ArtiboxEditor({ theme, locale, className, style, ...props }: ArtiboxEditorProps) {
    return (
      <LocaleProvider locale={locale}>
        <ThemeProvider theme={theme}>
          {({ props: themeProps }) => (
            <Editor
              className={cx('artibox-editor', themeProps.className, className)}
              plugins={plugins}
              style={{ ...themeProps.style, ...style }}
              {...props}
            />
          )}
        </ThemeProvider>
      </LocaleProvider>
    );
  }

  return ArtiboxEditor;
}
