export const RendererObjectRenderMap = {
  annotation: 'renderAnnotation',
  block: 'renderBlock',
  decoration: 'renderDecoration',
  document: 'renderDocument',
  editor: 'renderEditor',
  inline: 'renderInline',
  mark: 'renderMark'
} as const;
export type RendererObjectRenderMap = typeof RendererObjectRenderMap;
