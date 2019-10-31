import React, { useState, useCallback } from 'react';
import { OnChangeFn, Editor } from 'slate-react';
import { initialValue } from './value';
import { plugins } from './plugins';

const style = {
  border: 'solid 1px black',
  width: '100%',
  height: 800
};

export function RichEditor() {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback<OnChangeFn>(change => setValue(change.value), []);

  return <Editor style={style} value={value} onChange={onChange} plugins={plugins} />;
}
