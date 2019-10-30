import React, { useState, useCallback } from 'react';
import { Value, Editor } from 'slate';
import { OnChangeFn } from 'slate-react';
import { Container } from '@artibox/slate-core';
import { ArtiboxSlateEditor, useContainer } from '@artibox/slate-editor';
import { BoldPlugin, useBoldIsActive, useBoldOnClick } from '@artibox/slate-plugin-bold';

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

const BoldButton = ({ editor }: { editor: Editor }) => {
  const container = useContainer();
  const active = useBoldIsActive(editor, container);
  const onClick = useBoldOnClick(editor, container);

  return (
    <button
      style={{
        fontWeight: active ? 700 : 400
      }}
      onClick={onClick}
    >
      bold
    </button>
  );
};

const { plugins, container } = Container.resolvePluginsAndCreate([
  BoldPlugin(),
  {
    renderEditor: (_, editor, next) => {
      return (
        <>
          <BoldButton editor={editor} />
          {next()}
        </>
      );
    }
  }
]);

export function SimpleEditor() {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback<OnChangeFn>(change => setValue(change.value), []);

  return <ArtiboxSlateEditor style={style} value={value} onChange={onChange} plugins={plugins} container={container} />;
}
