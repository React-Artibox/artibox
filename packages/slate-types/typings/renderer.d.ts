import { Plugin as SlateReactPlugin } from 'slate-react';

/**
 * All render method names of `slate-react`.
 */
export type RenderMethodNames =
  | 'renderAnnotation'
  | 'renderBlock'
  | 'renderDecoration'
  | 'renderDocument'
  | 'renderEditor'
  | 'renderInline'
  | 'renderMark';

/**
 * @internal
 * To pick the render method needed.
 */
type PickRenderMethod<R extends RenderMethodNames> = {
  [renderMethod in R]: NonNullable<SlateReactPlugin[renderMethod]>;
};

export type AnnotationRenderer = PickRenderMethod<'renderAnnotation'>;
export type BlockRenderer = PickRenderMethod<'renderBlock'>;
export type DecorationRender = PickRenderMethod<'renderDecoration'>;
export type DocumentRenderer = PickRenderMethod<'renderDocument'>;
export type EditorRenderer = PickRenderMethod<'renderEditor'>;
export type InlineRenderer = PickRenderMethod<'renderInline'>;
export type MarkRenderer = PickRenderMethod<'renderMark'>;

export type Renderer =
  | AnnotationRenderer
  | BlockRenderer
  | DecorationRender
  | DocumentRenderer
  | EditorRenderer
  | InlineRenderer
  | MarkRenderer;
