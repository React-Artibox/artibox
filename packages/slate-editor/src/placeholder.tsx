import React, { FC, CSSProperties } from 'react';
import { Plugin } from 'slate-react';
import { useLocale } from '@artibox/components/locale';
import { isNodeExcludeText } from '@artibox/slate-common/utils/is-node-exclude-text';

const PLACEHOLDER_TYPE = 'placeholder' as const;

const placeholderStyle: CSSProperties = {
  pointerEvents: 'none',
  display: 'inline-block',
  width: 0,
  maxWidth: '100%',
  whiteSpace: 'nowrap',
  verticalAlign: 'text-top'
};

const Placeholder: FC = ({ children }) => {
  const locale = useLocale();
  const { placeholder } = locale.editor;

  return (
    <span>
      <span className="artibox-editor__placeholder" contentEditable={false} style={placeholderStyle}>
        {placeholder}
      </span>
      {children}
    </span>
  );
};

export const placeholder: Plugin = {
  decorateNode(node, editor, next) {
    const others = next();

    if (editor.value.document.text !== '' || editor.value.document.nodes.size > 1 || !isNodeExcludeText(node)) {
      return others;
    }

    return [...others, { type: PLACEHOLDER_TYPE }];
  },
  renderDecoration: (props, _, next) =>
    props.decoration.type === PLACEHOLDER_TYPE ? <Placeholder>{props.children}</Placeholder> : next()
};
