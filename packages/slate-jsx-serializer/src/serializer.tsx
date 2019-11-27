import React, { ReactNode, ReactElement, cloneElement } from 'react';
import { Value, Node, Document, Block, Inline, Mark, Text } from 'slate';
import { PARAGRAPH_TYPE } from '@artibox/slate-common/constants/paragraph.constants';

export type JsxSerialize<N> = (children: ReactNode, node: N) => ReactElement | undefined;

export interface CreateJsxSerializerConfig {
  blocks?: {
    [type: string]: JsxSerialize<Block> | undefined;
  };
  inlines?: {
    [type: string]: JsxSerialize<Inline> | undefined;
  };
  marks?: {
    [type: string]: JsxSerialize<Mark> | undefined;
  };
}

let key = 0;

function addKey(element: ReactElement) {
  return cloneElement(element, { key: key++ });
}

const PARAGRAPH_SERIALIZE: JsxSerialize<Block> = (children, node) =>
  node.text !== '' ? <div>{children}</div> : <br />;

export function createJsxSerializer(config: CreateJsxSerializerConfig) {
  const { inlines: inlineSerializers, marks: markSerializers } = config;
  let { blocks: blockSerializers } = config;
  blockSerializers = { ...config.blocks, [PARAGRAPH_TYPE]: PARAGRAPH_SERIALIZE };

  function serializeText(node: Text): ReactNode {
    const { text } = node;

    if (!node.marks) {
      return text;
    }

    return node.marks.reduce<ReactNode>((element, mark) => {
      const serialize = markSerializers?.[mark!.type];

      if (!serialize) {
        return element;
      }

      const result = serialize(element, mark!);
      return result === undefined ? element : addKey(result);
    }, text);
  }

  function serializeNode(node: Node): ReactNode {
    if (node.object === 'text') {
      return serializeText(node);
    }

    const children = (node.nodes as Document['nodes'])
      .map(n => serializeNode(n!))
      .filter(Boolean)
      .toArray();

    if (node.object === 'block') {
      const serialize = blockSerializers?.[node.type];
      const result = serialize?.(children, node);
      return result === undefined ? children : addKey(result);
    } else if (node.object === 'inline') {
      const serialize = inlineSerializers?.[node.type];
      const result = serialize?.(children, node);
      return result === undefined ? children : addKey(result);
    }

    return children;
  }

  function JsxSerializer(value: Value) {
    return serializeNode(value.document);
  }

  return JsxSerializer;
}
