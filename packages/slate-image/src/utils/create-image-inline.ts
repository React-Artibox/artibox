import { Inline } from 'slate';

export function createImageInline(type: string, src: string, hostingType?: string, width = 100): Inline {
  return Inline.create({
    type,
    data: { src, hostingType, width },
    nodes: undefined
  });
}
