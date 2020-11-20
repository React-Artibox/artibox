import React from 'react';
import { Slate } from 'slate-react';
import { ConfigsProvider, ConfigsProviderProps } from '../../configs';

export type ArtiboxProps = Pick<Parameters<typeof Slate>[0], 'children' | 'editor' | 'onChange' | 'value'> &
  Omit<ConfigsProviderProps, 'children'>;

/**
 * Provide configs of artibox and control the value.
 */
function Artibox(props: ArtiboxProps) {
  const { children, editor, locale, onChange, theme, value } = props;

  return (
    <ConfigsProvider theme={theme} locale={locale}>
      <Slate editor={editor} onChange={onChange} value={value}>
        {children}
      </Slate>
    </ConfigsProvider>
  );
}

export default Artibox;
