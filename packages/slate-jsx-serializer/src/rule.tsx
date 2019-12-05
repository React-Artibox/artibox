import React, { ReactHTML, ComponentType } from 'react';
import { JsxSerializerRule } from './typings';

export interface CreateJsxSerializerRuleConfig<N, P = {}> {
  type: string;
  component: keyof ReactHTML | ComponentType<P>;
  getProps?: (node: N) => Partial<P>;
  isVoid?: boolean;
}

export function createJsxSerializerRule<N, P = {}>(config: CreateJsxSerializerRuleConfig<N, P>): JsxSerializerRule<N> {
  const { type, component, getProps, isVoid = false } = config;
  const Component = component as any;
  return {
    type,
    serialize: (children, node) => <Component {...getProps?.(node)}>{isVoid ? undefined : children}</Component>
  };
}
