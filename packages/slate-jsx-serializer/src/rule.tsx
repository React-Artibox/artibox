import React from 'react';
import { RendererBaseComponent } from '@artibox/slate-common';
import { JsxSerializerRule } from './typings';

export interface CreateJsxSerializerRuleConfig<N, P = Record<string, unknown>> {
  type: string;
  component: RendererBaseComponent<P>;
  getProps?: (node: N) => Partial<P>;
  isVoid?: boolean;
}

export function createJsxSerializerRule<N, P = Record<string, unknown>>(
  config: CreateJsxSerializerRuleConfig<N, P>
): JsxSerializerRule<N> {
  const { type, component, getProps, isVoid = false } = config;
  const Component = component as any;
  return {
    type,
    serialize: (children, node) => <Component {...getProps?.(node)}>{isVoid ? undefined : children}</Component>
  };
}
