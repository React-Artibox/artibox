import { text } from '@storybook/addon-knobs';

import React, { useMemo, useState } from 'react';
import { Node } from 'slate';
import THEME_ARTIBOX from '@artibox/theme/artibox';
import { Italic as ItalicIcon } from '@artibox/icons/italic';
import { Artibox, Editable, createReactEditor, composeRenderLeafs, composeHandlers } from '@artibox/slate-react';
import { PARAGRAPH_TYPE } from '@artibox/slate-react/paragraph';
import { createReactItalic, ITALIC_HOTKEY, ITALIC_TYPE } from '@artibox/slate-react/italic';
import { ToggleMarkToolbarIcon } from '@artibox/slate-react/toggle-mark/toolbar';
import { Toolbar } from '@artibox/slate-react/toolbar';

export default {
  title: 'Marks/Italic'
};

export const Example = () => {
  const type = text('type', ITALIC_TYPE);
  const hotkey = text('hotkey', ITALIC_HOTKEY);
  const italic = createReactItalic({ type });
  const createHandlers = composeHandlers([italic.createHandlers({ hotkey })]);
  const renderLeaf = composeRenderLeafs([italic.createRenderLeaf()]);
  const initialValues: Node[] = [
    {
      type: PARAGRAPH_TYPE,
      children: [
        {
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. '
        },
        {
          text: 'Officiis cupiditate enim distinctio excepturi',
          [italic.type]: true
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
          {expanded => (expanded ? <ToggleMarkToolbarIcon controller={italic} icon={ItalicIcon} /> : null)}
        </Toolbar>
        <Editable {...handlers} className="stories__custom-elements stories__editable" renderLeaf={renderLeaf} />
      </Artibox>
    );
  };

  return <Editor />;
};
