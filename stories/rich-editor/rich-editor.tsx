import React, { useState, useCallback } from 'react';
import { OnChangeFn } from 'slate-react';
import { ArtiboxEditor } from '@artibox/slate-editor';
import { initialValue } from './value';
import { plugins } from './plugins';
import './rich-editor.scss';

export function RichEditor() {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback<OnChangeFn>(change => setValue(change.value), []);

  return <ArtiboxEditor className="rich-editor" value={value} onChange={onChange} plugins={plugins} />;
}
