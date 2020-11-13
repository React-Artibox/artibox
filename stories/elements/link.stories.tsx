import { text } from '@storybook/addon-knobs';

import React, { useMemo, useState } from 'react';
import { Node } from 'slate';
import THEME_ARTIBOX from '@artibox/theme/artibox';
import { Link as LinkIcon, Unlink as UnlinkIcon } from '@artibox/icons';
import { Artibox, Editable, createReactEditor, composeRenderElements } from '@artibox/slate-react';
import { PARAGRAPH_TYPE } from '@artibox/slate-react/paragraph';
import { LINK_TYPE, createReactLink } from '@artibox/slate-react/link';
import { LinkToolbarIcon, UnlinkToolbarIcon } from '@artibox/slate-react/link/toolbar';
import { Toolbar } from '@artibox/slate-react/toolbar';
import { linkDocgen } from './link.docgen';

export default {
  title: 'Elements/Link',
  subcomponents: linkDocgen
};

export const Example = () => {
  const type = text('type', LINK_TYPE);
  const link = createReactLink({ type });
  const renderElement = composeRenderElements([link.createRenderElement()]);
  const initialValues: Node[] = [
    {
      type: PARAGRAPH_TYPE,
      children: [
        {
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. '
        },
        {
          type: link.type,
          url: 'https://github.com/React-Artibox/artibox',
          children: [
            {
              text: 'Artibox'
            }
          ]
        },
        {
          text: ' Lorem ipsum dolor sit amet consectetur adipisicing elit.'
        }
      ]
    }
  ];

  const Editor = () => {
    const [value, setValue] = useState(initialValues);
    const editor = useMemo(() => link.with(createReactEditor()), []);

    return (
      <Artibox editor={editor} theme={THEME_ARTIBOX} onChange={setValue} value={value}>
        <Toolbar>
          {() => (
            <>
              <LinkToolbarIcon controller={link} icon={LinkIcon} />
              <UnlinkToolbarIcon controller={link} icon={UnlinkIcon} />
            </>
          )}
        </Toolbar>
        <Editable className="stories__editable" renderElement={renderElement} />
      </Artibox>
    );
  };

  return <Editor />;
};
