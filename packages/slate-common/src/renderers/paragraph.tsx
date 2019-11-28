import { PARAGRAPH_TYPE } from '@artibox/slate-common';
import { CreateCommonBlockRendererConfig, createCommonBlockRenderer } from './common-block';

export function createParagraphRenderer(component: CreateCommonBlockRendererConfig['component']) {
  return createCommonBlockRenderer({ type: PARAGRAPH_TYPE, component });
}
