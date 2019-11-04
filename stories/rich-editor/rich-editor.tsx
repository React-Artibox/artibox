import React, { useState, useCallback } from 'react';
import { OnChangeFn, Editor } from 'slate-react';
import { initialValue } from './value';
import { plugins } from './plugins';
import './rich-editor.scss';

export function RichEditor() {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback<OnChangeFn>(change => setValue(change.value), []);

  return <Editor className="rich-editor" value={value} onChange={onChange} plugins={plugins} />;
}
