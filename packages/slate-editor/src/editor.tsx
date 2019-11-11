import React, { useMemo } from 'react';
import { Editor, EditorProps } from 'slate-react';
import cx from 'classnames';
import '@artibox/theme-default';
import { ThemeContext } from './theme';

export interface ArtiboxEditorProps extends EditorProps {
  theme?: string;
}

function ArtiboxEditor({ theme, className, ...props }: ArtiboxEditorProps) {
  const result = useMemo(() => {
    const themeName = `artibox-theme-${theme ?? 'default'}`;
    return { className: cx(className, themeName), theme: themeName };
  }, [theme, className]);

  return (
    <ThemeContext.Provider value={result.theme}>
      <Editor className={result.className} {...props} />
    </ThemeContext.Provider>
  );
}

export default ArtiboxEditor;
