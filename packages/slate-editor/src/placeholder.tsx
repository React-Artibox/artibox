import React, { FC, CSSProperties } from 'react';
import { Plugin } from 'slate-react';
import { useLocale } from '@artibox/components/locale';
import { isNodeExcludeText } from '@artibox/slate-common/utils/is-node-exclude-text';

const PLACEHOLDER_TYPE = 'placeholder' as const;

const placeholderStyle: CSSProperties = {
  pointerEvents: 'none',
  display: 'inline-block',
  width: '0',
  maxWidth: '100%',
  whiteSpace: 'nowrap',
  opacity: '0.333',
  verticalAlign: 'text-top'
};

const Placeholder: FC = ({ children }) => {
  const locale = useLocale();
  const { placeholder } = locale.editor;

  return (
    <span>
      <span contentEditable={false} style={placeholderStyle}>
        {placeholder}
      </span>
      {children}
    </span>
  );
};

export const placeholder: Plugin = {
  decorateNode(node, editor, next) {
    if (editor.value.document.text !== '' || editor.value.document.nodes.size > 1 || !isNodeExcludeText(node)) {
      return next();
    }

    const others = next();
    const [first] = node.texts({});
    const [last] = node.texts({ direction: 'backward' });
    const [firstNode, firstPath] = first;
    const [lastNode, lastPath] = last;
    const decoration = {
      type: PLACEHOLDER_TYPE,
      anchor: { key: firstNode.key, offset: 0, path: firstPath },
      focus: {
        key: lastNode.key,
        offset: lastNode.text.length,
        path: lastPath
      }
    };

    return [...others, decoration];
  },
  renderDecoration: (props, _, next) =>
    props.decoration.type === PLACEHOLDER_TYPE ? <Placeholder>{props.children}</Placeholder> : next()
};
