import React, { useState, useCallback } from 'react';
import { Value, Editor as CoreEditor } from 'slate';
import { OnChangeFn, Plugin, Editor } from 'slate-react';
import { BoldPlugin, useBoldIsActive, useBoldOnClick } from '@artibox/slate-plugin-bold';
import { ItalicPlugin, useItalicIsActive, useItalicOnClick } from '@artibox/slate-plugin-italic';

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

const BoldButton = ({ editor }: { editor: CoreEditor }) => {
  const active = useBoldIsActive(editor);
  const onClick = useBoldOnClick(editor);

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

const ItalicButton = ({ editor }: { editor: CoreEditor }) => {
  const active = useItalicIsActive(editor);
  const onClick = useItalicOnClick(editor);

  return (
    <button
      style={{
        fontWeight: active ? 700 : 400
      }}
      onClick={onClick}
    >
      italic
    </button>
  );
};

const plugins: Plugin[] = [
  BoldPlugin(),
  ItalicPlugin(),
  {
    renderEditor: (_, editor, next) => {
      return (
        <>
          <BoldButton editor={editor} />
          <ItalicButton editor={editor} />
          {next()}
        </>
      );
    }
  }
];

export function SimpleEditor() {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback<OnChangeFn>(change => setValue(change.value), []);

  return <Editor style={style} value={value} onChange={onChange} plugins={plugins} />;
}
