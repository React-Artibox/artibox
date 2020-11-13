import { boolean } from '@storybook/addon-knobs';

import React, { useMemo, useState } from 'react';
import { Node } from 'slate';
import THEME_ARTIBOX from '@artibox/theme/artibox';
import { Artibox, Editable, createReactEditor, composeRenderElements } from '@artibox/slate-react';
import { PARAGRAPH_TYPE, ReactParagraph } from '@artibox/slate-react/paragraph';
import { paragraphDocgen } from './paragraph.docgen';

export default {
  title: 'Elements/Paragraph',
  subcomponents: paragraphDocgen
};

export const Example = () => {
  const enable = boolean('enable', true);
  const renderElement = enable ? composeRenderElements([ReactParagraph.createRenderElement()]) : undefined;
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
    const editor = useMemo(() => createReactEditor(), []);

    return (
      <Artibox editor={editor} theme={THEME_ARTIBOX} onChange={setValue} value={value}>
        <Editable className="stories__editable" renderElement={renderElement} />
      </Artibox>
    );
  };

  return <Editor />;
};
