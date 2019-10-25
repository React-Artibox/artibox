import { Plugin as SlateReactPlugin } from 'slate-react';
import { RendererObjectRenderMap } from './renderer.constants';

export type RendererObject = keyof RendererObjectRenderMap;

export type RendererRenderMethodNames = RendererObjectRenderMap[RendererObject];

/**
 * @internal
 * To pick the render method needed.
 */
type PickRenderMethod<O extends RendererObject> = {
  object: O;
  render: NonNullable<SlateReactPlugin[RendererObjectRenderMap[O]]>;
};

export type AnnotationRenderer = PickRenderMethod<'annotation'>;
export type BlockRenderer = PickRenderMethod<'block'>;
export type DecorationRender = PickRenderMethod<'decoration'>;
export type DocumentRenderer = PickRenderMethod<'document'>;
export type EditorRenderer = PickRenderMethod<'editor'>;
export type InlineRenderer = PickRenderMethod<'inline'>;
export type MarkRenderer = PickRenderMethod<'mark'>;

export type Renderer =
  | AnnotationRenderer
  | BlockRenderer
  | DecorationRender
  | DocumentRenderer
  | EditorRenderer
  | InlineRenderer
  | MarkRenderer;
