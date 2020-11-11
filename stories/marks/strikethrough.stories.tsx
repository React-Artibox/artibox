import { text } from '@storybook/addon-knobs';

import React, { useMemo, useState } from 'react';
import { Node } from 'slate';
import THEME_ARTIBOX from '@artibox/theme/artibox';
import { Strikethrough as StrikethroughIcon } from '@artibox/icons/strikethrough';
import { Artibox, Editable, createReactEditor, composeRenderLeafs, composeHandlers } from '@artibox/slate-react';
import { PARAGRAPH_TYPE } from '@artibox/slate-react/paragraph';
import { createReactStrikethrough, STRIKETHROUGH_HOTKEY, STRIKETHROUGH_TYPE } from '@artibox/slate-react/strikethrough';
import { ToggleMarkToolbarIcon } from '@artibox/slate-react/toggle-mark/toolbar';
import { Toolbar } from '@artibox/slate-react/toolbar';

export default {
  title: 'Marks/Strikethrough'
};

export const Example = () => {
  const type = text('type', STRIKETHROUGH_TYPE);
  const hotkey = text('hotkey', STRIKETHROUGH_HOTKEY);
  const strikethrough = createReactStrikethrough({ type });
  const createHandlers = composeHandlers([strikethrough.createHandlers({ hotkey })]);
  const renderLeaf = composeRenderLeafs([strikethrough.createRenderLeaf()]);
  const initialValues: Node[] = [
    {
      type: PARAGRAPH_TYPE,
      children: [
        {
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. '
        },
        {
          text: 'Officiis cupiditate enim distinctio excepturi',
          [strikethrough.type]: true
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
          {expanded =>
            expanded ? <ToggleMarkToolbarIcon controller={strikethrough} icon={StrikethroughIcon} /> : null
          }
        </Toolbar>
        <Editable {...handlers} className="stories__editable" renderLeaf={renderLeaf} />
      </Artibox>
    );
  };

  return <Editor />;
};
