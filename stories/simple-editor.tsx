import React, { useState, useCallback } from 'react';
import { Value } from 'slate';
import { OnChangeFn } from 'slate-react';
import { resolveModules } from '@artibox/slate-core';
import { ArtiboxSlateEditor } from '@artibox/slate-editor';
import { BoldModule } from '@artibox/slate-module-bold';

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

const resolvedModules = resolveModules([BoldModule()]);

export function SimpleEditor() {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback<OnChangeFn>(change => setValue(change.value), []);

  return <ArtiboxSlateEditor style={style} value={value} onChange={onChange} resolvedModules={resolvedModules} />;
}
