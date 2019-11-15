import React from 'react';
import { Editor, EditorProps } from 'slate-react';
import cx from 'classnames';
import { ThemeProvider } from '@artibox/components';
import '@artibox/theme-default';

export interface ArtiboxEditorProps extends EditorProps {
  theme?: string;
}

function ArtiboxEditor({ theme, className, ...props }: ArtiboxEditorProps) {
  return (
    <ThemeProvider theme={theme}>
      {themeName => <Editor className={cx(className, themeName)} {...props} />}
    </ThemeProvider>
  );
}

export default ArtiboxEditor;
