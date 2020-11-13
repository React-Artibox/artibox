import { text } from '@storybook/addon-knobs';

import React, { useMemo, useState } from 'react';
import { Node } from 'slate';
import THEME_ARTIBOX from '@artibox/theme/artibox';
import { Divider as DividerIcon } from '@artibox/icons/divider';
import { Artibox, Editable, createReactEditor, composeRenderElements } from '@artibox/slate-react';
import { PARAGRAPH_TYPE } from '@artibox/slate-react/paragraph';
import { DIVIDER_TYPE, createReactDivider } from '@artibox/slate-react/divider';
import { DividerToolbarIcon } from '@artibox/slate-react/divider/toolbar';
import { Toolbar } from '@artibox/slate-react/toolbar';
import { dividerDocgen } from './divider.docgen';

export default {
  title: 'Elements/Divider',
  subcomponents: dividerDocgen
};

export const Example = () => {
  const type = text('type', DIVIDER_TYPE);
  const divider = createReactDivider({ type });
  const renderElement = composeRenderElements([divider.createRenderElement()]);
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
      type: divider.type,
      children: [{ text: '' }]
    },
    {
      type: PARAGRAPH_TYPE,
      children: [
        {
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
        }
      ]
    }
  ];

  const Editor = () => {
    const [value, setValue] = useState(initialValues);
    const editor = useMemo(() => divider.with(createReactEditor()), []);

    return (
      <Artibox editor={editor} theme={THEME_ARTIBOX} onChange={setValue} value={value}>
        <Toolbar>{() => <DividerToolbarIcon controller={divider} icon={DividerIcon} />}</Toolbar>
        <Editable className="stories__editable" renderElement={renderElement} />
      </Artibox>
    );
  };

  return <Editor />;
};
