import { text, boolean } from '@storybook/addon-knobs';

import React, { useMemo, useState } from 'react';
import { Node } from 'slate';
import THEME_ARTIBOX from '@artibox/theme/artibox';
import { Blockquote as BlockquoteIcon } from '@artibox/icons/blockquote';
import { Artibox, Editable, createReactEditor, composeRenderElements, composeHandlers } from '@artibox/slate-react';
import { PARAGRAPH_TYPE } from '@artibox/slate-react/paragraph';
import { BLOCKQUOTE_TYPE, BLOCKQUOTE_HOTKEY, createReactBlockquote } from '@artibox/slate-react/blockquote';
import { BlockquoteToolbarIcon } from '@artibox/slate-react/blockquote/toolbar';
import { Toolbar } from '@artibox/slate-react/toolbar';
import { customRenderBlockquote } from '../../custom-elements';

export default {
  title: 'Elements/Blockquote'
};

export const Example = () => {
  const type = text('type', BLOCKQUOTE_TYPE);
  const hotkey = text('hotkey', BLOCKQUOTE_HOTKEY);
  const render = boolean('native blockquote', false) ? undefined : customRenderBlockquote;
  const blockquote = createReactBlockquote({ type });
  const createHandlers = composeHandlers([blockquote.createHandlers({ hotkey })]);
  const renderElement = composeRenderElements([blockquote.createRenderElement({ render })]);
  const initialValues: Node[] = [
    {
      type: PARAGRAPH_TYPE,
      children: [
        {
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
        }
      ]
    },
    {
      type: blockquote.type,
      children: [
        {
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
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
        <Toolbar>{() => <BlockquoteToolbarIcon controller={blockquote} icon={BlockquoteIcon} />}</Toolbar>
        <Editable {...handlers} className="stories__custom-elements stories__editable" renderElement={renderElement} />
      </Artibox>
    );
  };

  return <Editor />;
};
