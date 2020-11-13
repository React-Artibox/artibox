import { text } from '@storybook/addon-knobs';

import React, { useMemo, useState } from 'react';
import { Node } from 'slate';
import THEME_ARTIBOX from '@artibox/theme/artibox';
import { Bold as BoldIcon } from '@artibox/icons/bold';
import { Artibox, Editable, createReactEditor, composeRenderLeafs, composeHandlers } from '@artibox/slate-react';
import { PARAGRAPH_TYPE } from '@artibox/slate-react/paragraph';
import { createReactBold, BOLD_HOTKEY, BOLD_TYPE } from '@artibox/slate-react/bold';
import { ToggleMarkToolbarIcon } from '@artibox/slate-react/toggle-mark/toolbar';
import { Toolbar } from '@artibox/slate-react/toolbar';

export default {
  title: 'Marks/Bold'
};

export const Example = () => {
  const type = text('type', BOLD_TYPE);
  const hotkey = text('hotkey', BOLD_HOTKEY);
  const bold = createReactBold({ type });
  const createHandlers = composeHandlers([bold.createHandlers({ hotkey })]);
  const renderLeaf = composeRenderLeafs([bold.createRenderLeaf()]);
  const initialValues: Node[] = [
    {
      type: PARAGRAPH_TYPE,
      children: [
        {
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. '
        },
        {
          text: 'Officiis cupiditate enim distinctio excepturi',
          [bold.type]: true
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
        <Toolbar>{expanded => (expanded ? <ToggleMarkToolbarIcon controller={bold} icon={BoldIcon} /> : null)}</Toolbar>
        <Editable {...handlers} className="stories__custom-elements stories__editable" renderLeaf={renderLeaf} />
      </Artibox>
    );
  };

  return <Editor />;
};
