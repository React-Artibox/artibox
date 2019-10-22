import { Plugin as SlateReactPlugin } from 'slate-react';

export type RenderMethodNames =
  | 'renderAnnotation'
  | 'renderBlock'
  | 'renderDecoration'
  | 'renderDocument'
  | 'renderEditor'
  | 'renderInline'
  | 'renderMark';

export type CommonPlugin = Omit<SlateReactPlugin, RenderMethodNames>;

export type HelperPlugin<K extends keyof CommonPlugin> = {
  [key in K]: Exclude<CommonPlugin[key], undefined>;
};

export type Renderer<R extends RenderMethodNames> = {
  [renderMethod in R]: Exclude<SlateReactPlugin[renderMethod], undefined>;
};

export type MarkRenderer = Renderer<'renderMark'>;
export type MarkPlugin = CommonPlugin & MarkRenderer;

export type Plugin = CommonPlugin | MarkPlugin;
