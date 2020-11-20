import React, { cloneElement, CSSProperties, ReactElement } from 'react';
import { Element, Node } from 'slate';
import { WithElementParent } from '@artibox/slate-common/serializers/typings';
import { isText } from '@artibox/slate-common/serializers/utils/isText';
import { composeRenderElementsBase } from '../_internal/renderer/composeRenderElementsBase';
import { composeRenderLeafsBase } from '../_internal/renderer/composeRenderLeafsBase';
import { JsxSerializeElementProps, JsxSerializeLeafProps } from './typings';

let key = 0;

function addKey(element: ReactElement) {
  return cloneElement(element, { key: key++ });
}

export interface CreateJsxSerializerOptioons {
  /**
   * Invoked while no any `elements` matching.
   */
  defaultElement?: (props: JsxSerializeElementProps) => JSX.Element;
  /**
   * Invoked while no any `leafs` matching.
   */
  defaultLeaf?: (props: JsxSerializeLeafProps) => JSX.Element;
  elements?: ((props: JsxSerializeElementProps) => JSX.Element | null | undefined)[];
  leafs?: ((props: JsxSerializeLeafProps) => JSX.Element)[];
}

export function createJsxSerializer(options: CreateJsxSerializerOptioons) {
  const {
    defaultElement: defaultSerializeElement = ({ children }) => <div>{children}</div>,
    defaultLeaf: defaultSerializeLeaf = ({ children }) => <span>{children}</span>,
    elements: serializeElements = [],
    leafs: serializeLeafs = []
  } = options;
  const serializeElement = composeRenderElementsBase(defaultSerializeElement, serializeElements);
  const serializeLeaf = composeRenderLeafsBase(defaultSerializeLeaf, serializeLeafs);
  const leafStyle: CSSProperties = {
    whiteSpace: 'pre-wrap'
  };

  function serializeNode(node: Node & WithElementParent): JSX.Element {
    const { parent } = node;
    let result: JSX.Element;

    if (!isText(node)) {
      result = serializeElement({
        children: serializeNodes(node.children, node),
        element: {
          ...node,
          parent
        }
      });
    } else if (node.text) {
      result = serializeLeaf({
        leaf: node,
        children: (
          <span style={leafStyle}>
            {node.text
              .split('\n')
              .map(t => t || ' ')
              .join('\n')}
          </span>
        )
      });
    } else {
      result = <span>&#65279;</span>;
    }

    return addKey(result);
  }

  function serializeNodes(nodes: Node[], parent: (Element & WithElementParent) | undefined): JSX.Element {
    return <>{nodes.map(node => serializeNode({ ...node, parent }))}</>;
  }

  return {
    serialize: (nodes: Node[]) => serializeNodes(nodes, undefined)
  };
}
