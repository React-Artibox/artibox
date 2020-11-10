import { Element, Text } from 'slate';

export interface EmbedElement extends Element {
  type: string;
  provider: string;
  children: [Text];
}

export interface EmbedStrategy<ED extends Record<string, unknown>, RD> {
  readonly serialize: (embedCode: string) => ED | undefined;
  readonly deserialize: (element: EmbedElement & ED) => RD;
  readonly isElementDataValid: (data: Record<keyof ED, unknown>) => boolean;
}

export type EmbedStrategies<P extends string> = {
  [provider in P]: EmbedStrategy<any, any>;
};
