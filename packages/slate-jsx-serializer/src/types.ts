import { ReactNode, ReactElement } from 'react';

export type JsxSerializeFn<N> = (children: ReactNode, node: N) => ReactElement | undefined;

export type JsxSerializerRule<N> = {
  type: string;
  serialize: JsxSerializeFn<N>;
};
