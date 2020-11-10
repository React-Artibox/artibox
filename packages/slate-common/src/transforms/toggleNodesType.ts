import { Editor, Transforms } from 'slate';
import { isNodesTypeIn } from '../queries/isNodesTypeIn';
import { PARAGRAPH_TYPE } from '../paragraph';
import { TransformsSetNodesOptions } from '../typings/transforms';

export interface ToggleNodesTypeOptions extends TransformsSetNodesOptions {
  defaultType?: string;
}

export function toggleNodesType(editor: Editor, activeType: string, options: ToggleNodesTypeOptions = {}) {
  const { defaultType = PARAGRAPH_TYPE } = options;
  const isActive = isNodesTypeIn(editor, [activeType]);
  const type = isActive ? defaultType : activeType;

  Transforms.setNodes(editor, { type }, options);
}
