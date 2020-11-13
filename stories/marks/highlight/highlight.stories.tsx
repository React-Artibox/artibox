import { text } from '@storybook/addon-knobs';

import React, { useMemo, useState } from 'react';
import { Node } from 'slate';
import THEME_ARTIBOX from '@artibox/theme/artibox';
import { Highlight as HighlightIcon } from '@artibox/icons/highlight';
import { Artibox, Editable, createReactEditor, composeRenderLeafs, composeHandlers } from '@artibox/slate-react';
import { PARAGRAPH_TYPE } from '@artibox/slate-react/paragraph';
import { createReactHighlight, HIGHLIGHT_HOTKEY, HIGHLIGHT_TYPE } from '@artibox/slate-react/highlight';
import { ToggleMarkToolbarIcon } from '@artibox/slate-react/toggle-mark/toolbar';
import { Toolbar } from '@artibox/slate-react/toolbar';

export default {
  title: 'Marks/Highlight'
};

export const Example = () => {
  const type = text('type', HIGHLIGHT_TYPE);
  const hotkey = text('hotkey', HIGHLIGHT_HOTKEY);
  const highlight = createReactHighlight({ type });
  const createHandlers = composeHandlers([highlight.createHandlers({ hotkey })]);
  const renderLeaf = composeRenderLeafs([highlight.createRenderLeaf()]);
  const initialValues: Node[] = [
    {
      type: PARAGRAPH_TYPE,
      children: [
        {
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. '
        },
        {
          text: 'Officiis cupiditate enim distinctio excepturi',
          [highlight.type]: true
        },
        {
          text:
            ', sapiente ut pariatur repudiandae maxime odit eius accusantium voluptatum nemo facilis eligendi aperiam commodi quibusdam placeat impedit.'
        }
      ]
    }
  ];

  const Editor = () => {
    const [value, setValue] = useState(initialValues);
    const editor = useMemo(() => createReactEditor(), []);
    const handlers = useMemo(() => createHandlers(editor), [editor]);

    return (
      <Artibox editor={editor} theme={THEME_ARTIBOX} onChange={setValue} value={value}>
        <Toolbar>
          {expanded => (expanded ? <ToggleMarkToolbarIcon controller={highlight} icon={HighlightIcon} /> : null)}
        </Toolbar>
        <Editable {...handlers} className="stories__custom-elements stories__editable" renderLeaf={renderLeaf} />
      </Artibox>
    );
  };

  return <Editor />;
};
