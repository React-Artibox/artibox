import { text } from '@storybook/addon-knobs';

import React, { useMemo, useState } from 'react';
import { Node } from 'slate';
import THEME_ARTIBOX from '@artibox/theme/artibox';
import { UnorderedList as UnorderedListIcon, OrderedList as OrderedListIcon } from '@artibox/icons';
import { Artibox, Editable, createReactEditor, composeRenderElements, composeHandlers } from '@artibox/slate-react';
import { PARAGRAPH_TYPE } from '@artibox/slate-react/paragraph';
import { LIST_TYPES, createReactList } from '@artibox/slate-react/list';
import { ListToolbarIcon } from '@artibox/slate-react/list/toolbar';
import { Toolbar } from '@artibox/slate-react/toolbar';
import { listDocgen } from './list.docgen';

export default {
  title: 'Elements/List',
  subcomponents: listDocgen
};

export const Example = () => {
  const types = (['ul', 'ol', 'li'] as const).reduce(
    (acc, key) => {
      const type = text(key, LIST_TYPES[key], 'types');
      acc[key] = type;
      return acc;
    },
    { ...LIST_TYPES }
  );
  const list = createReactList({ types });
  const createHandlers = composeHandlers([list.createHandlers()]);
  const renderElement = composeRenderElements([list.createRenderElement()]);
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
      type: list.types.ul,
      children: [
        {
          type: list.types.li,
          children: [
            {
              type: PARAGRAPH_TYPE,
              children: [
                {
                  text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
                }
              ]
            },
            {
              type: list.types.ul,
              children: [
                {
                  type: list.types.li,
                  children: [
                    {
                      type: PARAGRAPH_TYPE,
                      children: [
                        {
                          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: list.types.ol,
      children: [
        {
          type: list.types.li,
          children: [
            {
              type: PARAGRAPH_TYPE,
              children: [
                {
                  text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
                }
              ]
            },
            {
              type: list.types.ol,
              children: [
                {
                  type: list.types.li,
                  children: [
                    {
                      type: PARAGRAPH_TYPE,
                      children: [
                        {
                          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
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
    const editor = useMemo(() => list.with(createReactEditor()), []);
    const handlers = useMemo(() => createHandlers(editor), [editor]);

    return (
      <Artibox editor={editor} theme={THEME_ARTIBOX} onChange={setValue} value={value}>
        <Toolbar>
          {() => (
            <>
              <ListToolbarIcon icon={UnorderedListIcon} controller={list} listTypeKey="ul" />
              <ListToolbarIcon icon={OrderedListIcon} controller={list} listTypeKey="ol" />
            </>
          )}
        </Toolbar>
        <Editable {...handlers} className="stories__editable" renderElement={renderElement} />
      </Artibox>
    );
  };

  return <Editor />;
};
