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

type PluginWithRender<R extends RenderMethodNames> = CommonPlugin &
  {
    [renderMethod in R]: SlateReactPlugin[renderMethod];
  };

export type MarkPlugin = PluginWithRender<'renderMark'>;

export type Plugin = CommonPlugin | MarkPlugin;
