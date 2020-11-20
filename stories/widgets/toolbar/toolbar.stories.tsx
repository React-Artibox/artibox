import { text } from '@storybook/addon-knobs';

import React, { useState, useMemo } from 'react';
import { Node } from 'slate';
import { THEME_ARTIBOX } from '@artibox/theme/artibox';
import { PARAGRAPH_TYPE } from '@artibox/slate-common/paragraph';
import { Artibox, Editable, createReactEditor } from '@artibox/slate-react';
import { Toolbar, TOOLBAR_DIVIDER } from '@artibox/slate-react/toolbar';

export default {
  title: 'Widgets/Toolbar'
};

export const Example = () => {
  const expandedText = text('text on expanded', 'expanded');
  const collapsedText = text('text on collapsed', 'collapsed');
  const Editor = () => {
    const editor = useMemo(() => createReactEditor(), []);
    const [value, setValue] = useState<Node[]>([
      {
        type: PARAGRAPH_TYPE,
        children: [{ text: '' }]
      }
    ]);

    return (
      <Artibox editor={editor} onChange={setValue} theme={THEME_ARTIBOX} value={value}>
        <Toolbar>
          {expanded => (
            <>
              {expanded ? expandedText : collapsedText}
              {TOOLBAR_DIVIDER}
              toobar
            </>
          )}
        </Toolbar>
        <Editable className="stories__editable" />
      </Artibox>
    );
  };

  return <Editor />;
};
