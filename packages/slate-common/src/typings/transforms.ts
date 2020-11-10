import { Transforms } from 'slate';

type ExtractTransformsMethodOptions<K extends keyof typeof Transforms, I extends number> = NonNullable<
  Parameters<typeof Transforms[K]>[I]
>;

export type TransformsInsertNodesOptions = ExtractTransformsMethodOptions<'insertNodes', 2>;
export type TransformsSetNodesOptions = ExtractTransformsMethodOptions<'setNodes', 2>;
export type TransformsWrapNodesOptions = ExtractTransformsMethodOptions<'wrapNodes', 2>;
