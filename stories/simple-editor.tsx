import React, { useState, useCallback } from 'react';
import { Value } from 'slate';
import { Editor, OnChangeFn } from 'slate-react';
import { BoldPlugin } from '@artibox/slate-plugin-bold/src';

const style = {
  border: 'solid 1px black',
  width: '100%',
  height: 800
};

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            text: 'A line of text in a paragraph.'
          }
        ]
      }
    ]
  }
});

const plugins = [BoldPlugin()];

export function SimpleEditor() {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback<OnChangeFn>(change => setValue(change.value), []);

  return <Editor style={style} value={value} onChange={onChange} plugins={plugins} />;
}
