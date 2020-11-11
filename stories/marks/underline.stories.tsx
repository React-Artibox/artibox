import { text } from '@storybook/addon-knobs';

import React, { useMemo, useState } from 'react';
import { Node } from 'slate';
import THEME_ARTIBOX from '@artibox/theme/artibox';
import { Underline as UnderlineIcon } from '@artibox/icons/underline';
import { Artibox, Editable, createReactEditor, composeRenderLeafs, composeHandlers } from '@artibox/slate-react';
import { PARAGRAPH_TYPE } from '@artibox/slate-react/paragraph';
import { createReactUnderline, UNDERLINE_HOTKEY, UNDERLINE_TYPE } from '@artibox/slate-react/underline';
import { ToggleMarkToolbarIcon } from '@artibox/slate-react/toggle-mark/toolbar';
import { Toolbar } from '@artibox/slate-react/toolbar';

export default {
  title: 'Marks/Underline'
};

export const Example = () => {
  const type = text('type', UNDERLINE_TYPE);
  const hotkey = text('hotkey', UNDERLINE_HOTKEY);
  const underline = createReactUnderline({ type });
  const createHandlers = composeHandlers([underline.createHandlers({ hotkey })]);
  const renderLeaf = composeRenderLeafs([underline.createRenderLeaf()]);
  const initialValues: Node[] = [
    {
      type: PARAGRAPH_TYPE,
      children: [
        {
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. '
        },
        {
          text: 'Officiis cupiditate enim distinctio excepturi',
          [underline.type]: true
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
          {expanded => (expanded ? <ToggleMarkToolbarIcon controller={underline} icon={UnderlineIcon} /> : null)}
        </Toolbar>
        <Editable {...handlers} className="stories__editable" renderLeaf={renderLeaf} />
      </Artibox>
    );
  };

  return <Editor />;
};
