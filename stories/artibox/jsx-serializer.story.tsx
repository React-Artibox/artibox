import '@artibox/theme/artibox.scss';
import React, { useState, useCallback, useMemo } from 'react';
import { OnChangeFn } from 'slate-react';
import { createArtiboxEditor } from '@artibox/slate-editor';
import { plugins } from './plugins';
import { initialValue } from './value';
import { jsxSerializer } from './jsx-serializer';

const ArtiboxEditor = createArtiboxEditor({ plugins, defaultBlockComponent: 'p' });

export function JsxSerializerStory() {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback<OnChangeFn>(change => setValue(change.value), []);
  const jsx = useMemo(() => jsxSerializer(value.toJSON()), [value.document]);

  return (
    <div className="jsx-serializer-story">
      <ArtiboxEditor
        className="artibox-stories-elements jsx-serializer-story__section"
        value={value}
        onChange={onChange}
        theme="artibox"
      />
      <div className="artibox-theme-artibox artibox-stories-elements jsx-serializer-story__section">{jsx}</div>
    </div>
  );
}

JsxSerializerStory.storyName = 'Jsx Serializer';
