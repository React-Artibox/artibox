import React, { ReactNode, ReactElement, cloneElement } from 'react';
import { ValueJSON, NodeJSON, BlockJSON, InlineJSON, MarkJSON, TextJSON } from 'slate';
import { PARAGRAPH_TYPE } from '@artibox/slate-common/constants/paragraph';
import { RendererBaseComponent } from '@artibox/slate-common';
import { JsxSerializerRule } from './typings';

export interface CreateJsxSerializerConfig {
  defaultBlockComponent?: RendererBaseComponent;
  blocks?: JsxSerializerRule<BlockJSON>[];
  inlines?: JsxSerializerRule<InlineJSON>[];
  marks?: JsxSerializerRule<MarkJSON>[];
}

interface JsxSerializerRuleMap<N> {
  [type: string]: JsxSerializerRule<N> | undefined;
}

let key = 0;

function addKey(element: ReactElement) {
  return cloneElement(element, { key: key++ });
}

function isNodeJSONAsTextJSON(node: NodeJSON): node is TextJSON {
  return node.object === 'text' || !('nodes' in node);
}

function createParagraphSerializerRule(Component: RendererBaseComponent): JsxSerializerRule<BlockJSON> {
  return {
    type: PARAGRAPH_TYPE,
    serialize: children => <Component>{children}</Component>
  };
}

function resolveRulesToMap<N>(
  rules: JsxSerializerRule<N>[],
  initialMap: JsxSerializerRuleMap<N> = {}
): JsxSerializerRuleMap<N> {
  if (rules.length === 0) {
    return {};
  }

  return rules.reduce((acc, rule) => {
    acc[rule.type] = rule;
    return acc;
  }, initialMap);
}

export function createJsxSerializer(config?: CreateJsxSerializerConfig) {
  const { defaultBlockComponent = 'div', blocks = [], inlines = [], marks = [] } = config || {};
  const blocksMap = resolveRulesToMap([...blocks, createParagraphSerializerRule(defaultBlockComponent)]);
  const inlinesMap = resolveRulesToMap(inlines);
  const marksMap = resolveRulesToMap(marks);

  function serializeText(node: TextJSON): ReactNode {
    const { text } = node;
    const textOrBr = text || addKey(<>&#65279;</>);

    if (!node.marks) {
      return textOrBr;
    }

    return node.marks.reduce<ReactNode>((element, mark) => {
      const rule = marksMap[mark!.type];

      if (!rule) {
        return element;
      }

      const result = rule.serialize(element, mark!);
      return result === undefined ? element : addKey(result);
    }, textOrBr);
  }

  function serializeNode(node: NodeJSON): ReactNode {
    if (isNodeJSONAsTextJSON(node)) {
      return serializeText(node);
    }

    const childrenArray = (node.nodes || []).map(serializeNode).filter(Boolean);
    const children = childrenArray.length ? childrenArray : undefined;

    if (node.object === 'block') {
      const rule = blocksMap[node.type];
      const result = rule?.serialize(children, node);
      return result === undefined ? children : addKey(result);
    } else if (node.object === 'inline') {
      const rule = inlinesMap[node.type];
      const result = rule?.serialize(children, node);
      return result === undefined ? children : addKey(result);
    }

    return children;
  }

  function JsxSerializer(value: ValueJSON) {
    return value.document ? serializeNode(value.document) : undefined;
  }

  return JsxSerializer;
}
