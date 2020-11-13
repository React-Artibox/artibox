import { text } from '@storybook/addon-knobs';

import React, { useMemo, useState } from 'react';
import { Node } from 'slate';
import THEME_ARTIBOX from '@artibox/theme/artibox';
import { Heading1 as Heading1Icon } from '@artibox/icons/heading1';
import { Heading2 as Heading2Icon } from '@artibox/icons/heading2';
import { Heading3 as Heading3Icon } from '@artibox/icons/heading3';
import { Artibox, Editable, createReactEditor, composeRenderElements, composeHandlers } from '@artibox/slate-react';
import { PARAGRAPH_TYPE } from '@artibox/slate-react/paragraph';
import { HEADING_TYPE, HEADING_HOTKEY, createReactHeading } from '@artibox/slate-react/heading';
import { HeadingToolbarIcon } from '@artibox/slate-react/heading/toolbar';
import { Toolbar } from '@artibox/slate-react/toolbar';
import { headingDocgen } from './heading.docgen';

export default {
  title: 'Elements/Heading',
  subcomponents: headingDocgen
};

export const Example = () => {
  const type = text('type', HEADING_TYPE);
  const hotkey = text('hotkey', HEADING_HOTKEY);
  const heading = createReactHeading({ type, enabledLevels: [1, 2, 3] });
  const createHandlers = composeHandlers([heading.createHandlers({ hotkey })]);
  const renderElement = composeRenderElements([heading.createRenderElement()]);
  const initialValues: Node[] = [
    {
      type: heading.type,
      level: 1,
      children: [
        {
          text: 'Heading 1'
        }
      ]
    },
    {
      type: heading.type,
      level: 2,
      children: [
        {
          text: 'Heading 2'
        }
      ]
    },
    {
      type: heading.type,
      level: 3,
      children: [
        {
          text: 'Heading 3'
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
    const editor = useMemo(() => heading.with(createReactEditor()), []);
    const handlers = useMemo(() => createHandlers(editor), [editor]);

    return (
      <Artibox editor={editor} theme={THEME_ARTIBOX} onChange={setValue} value={value}>
        <Toolbar>
          {() => (
            <>
              <HeadingToolbarIcon icon={Heading1Icon} controller={heading} level={1} />
              <HeadingToolbarIcon icon={Heading2Icon} controller={heading} level={2} />
              <HeadingToolbarIcon icon={Heading3Icon} controller={heading} level={3} />
            </>
          )}
        </Toolbar>
        <Editable {...handlers} className="stories__editable" renderElement={renderElement} />
      </Artibox>
    );
  };

  return <Editor />;
};
