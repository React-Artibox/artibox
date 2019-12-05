import React, { useState, useCallback, useMemo } from 'react';
import { OnChangeFn } from 'slate-react';
import { createArtiboxEditor } from '@artibox/slate-editor';
import { plugins } from '../rich-editor/plugins';
import { initialValue } from '../rich-editor/value';
import { jsxSerializer } from './serializer';
import './jsx-serializer.scss';

const ArtiboxEditor = createArtiboxEditor({ plugins });

export function JsxSerializer() {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback<OnChangeFn>(change => setValue(change.value), []);
  const jsx = useMemo(() => jsxSerializer(value.toJSON()), [value.document]);

  return (
    <div className="demo-jsx-serializer">
      <ArtiboxEditor className="demo-jsx-serializer__section" value={value} onChange={onChange} />
      <div className="demo-jsx-serializer__section">{jsx}</div>
    </div>
  );
}
