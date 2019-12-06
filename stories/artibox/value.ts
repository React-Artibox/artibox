import { Value } from 'slate';
import { PARAGRAPH_TYPE } from '@artibox/slate-common/constants/paragraph';
import { Heading, Blockquote, Link, Italic, Highlight } from './plugins';

export const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: Heading.type,
        data: {
          level: 1
        },
        nodes: [
          {
            object: 'text',
            marks: [
              {
                object: 'mark',
                type: Italic.type
              }
            ],
            text: 'A line of text in a paragraph. A line of text in a paragraph. A line of text in a paragraph.'
          }
        ]
      },
      {
        object: 'block',
        type: PARAGRAPH_TYPE,
        nodes: [
          {
            object: 'inline',
            type: Link.type,
            data: {
              href: 'https://www.google.com'
            },
            nodes: [
              {
                object: 'text',
                text: 'A line of text in a paragraph.'
              }
            ]
          },
          {
            object: 'text',
            text:
              'A line of text in a paragraph. A line of text in a paragraph.A line of text in a paragraph. A line of text in a paragraph. A line of text in a paragraph.A line of text in a paragraph. A line of text in a paragraph. A line of text in a paragraph.A line of text in a paragraph. A line of text in a paragraph. A line of text in a paragraph.'
          }
        ]
      },
      {
        object: 'block',
        type: Blockquote.type,
        nodes: [
          {
            object: 'block',
            type: PARAGRAPH_TYPE,
            nodes: [
              {
                object: 'text',
                text:
                  'A line of text in a paragraph. A line of text in a paragraph. A line of text in a paragraph.A line of text in a paragraph. A line of text in a paragraph. A line of text in a paragraph.A line of text in a paragraph. A line of text in a paragraph. A line of text in a paragraph.A line of text in a paragraph. A line of text in a paragraph. A line of text in a paragraph.'
              }
            ]
          }
        ]
      },
      {
        object: 'block',
        type: Heading.type,
        data: {
          level: 2
        },
        nodes: [
          {
            object: 'text',
            text: 'A line of text in a paragraph. A line of text in a paragraph.'
          }
        ]
      },
      {
        object: 'block',
        type: PARAGRAPH_TYPE,
        nodes: [
          {
            object: 'text',
            text: 'A line of text in a paragraph.',
            marks: [
              {
                object: 'mark',
                type: Highlight.type
              }
            ]
          },
          {
            object: 'text',
            text:
              'A line of text in a paragraph. A line of text in a paragraph.A line of text in a paragraph. A line of text in a paragraph. A line of text in a paragraph.A line of text in a paragraph. A line of text in a paragraph. A line of text in a paragraph.A line of text in a paragraph. A line of text in a paragraph. A line of text in a paragraph.'
          }
        ]
      },
      {
        object: 'block',
        type: PARAGRAPH_TYPE,
        nodes: [
          {
            object: 'text',
            text:
              'A line of text in a paragraph. A line of text in a paragraph. A line of text in a paragraph.A line of text in a paragraph. A line of text in a paragraph. A line of text in a paragraph.A line of text in a paragraph. A line of text in a paragraph. A line of text in a paragraph.A line of text in a paragraph. A line of text in a paragraph. A line of text in a paragraph.'
          }
        ]
      }
    ]
  }
});
