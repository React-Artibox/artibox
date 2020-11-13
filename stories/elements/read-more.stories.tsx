import { text } from '@storybook/addon-knobs';

import React, { useMemo, useState } from 'react';
import { Node } from 'slate';
import THEME_ARTIBOX from '@artibox/theme/artibox';
import { ReadMore as ReadMoreIcon } from '@artibox/icons/read-more';
import { Artibox, Editable, createReactEditor, composeRenderElements } from '@artibox/slate-react';
import { PARAGRAPH_TYPE } from '@artibox/slate-react/paragraph';
import { createReactReadMore, READ_MORE_TYPE } from '@artibox/slate-react/read-more';
import { ReadMoreToolbarIcon } from '@artibox/slate-react/read-more/toolbar';
import { Toolbar } from '@artibox/slate-react/toolbar';
import { readMoreDocgen } from './read-more.docgen';

export default {
  title: 'Elements/ReadMore',
  subcomponents: readMoreDocgen
};

export const Example = () => {
  const type = text('type', READ_MORE_TYPE);
  const readMore = createReactReadMore({ type });
  const renderElement = composeRenderElements([readMore.createRenderElement()]);
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
      type: readMore.type,
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
    const editor = useMemo(() => readMore.with(createReactEditor()), []);

    return (
      <Artibox editor={editor} theme={THEME_ARTIBOX} onChange={setValue} value={value}>
        <Toolbar>{() => <ReadMoreToolbarIcon controller={readMore} icon={ReadMoreIcon} />}</Toolbar>
        <Editable className="stories__editable" renderElement={renderElement} />
      </Artibox>
    );
  };

  return <Editor />;
};
