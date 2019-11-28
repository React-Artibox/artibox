import React from 'react';
import { createCommonEditorRenderer } from '@artibox/slate-common/renderers/common-editor';
import { Tool } from './types';
import ToolbarComponent from './components/toolbar';
import './styles';
import { ForPlugin } from '@artibox/slate-common/src';

export interface ToolbarForPluginConfig {
  collapsedTools?: Tool[];
  expandedTools?: Tool[];
  disabledBlocks?: string[];
}

export type Toolbar = ForPlugin<ToolbarForPluginConfig>;

export const Toolbar: Toolbar = {
  forPlugin(config) {
    const { collapsedTools, expandedTools, disabledBlocks } = config || {};

    return createCommonEditorRenderer({
      render(editor, el) {
        if (disabledBlocks && editor.value.blocks.some(block => disabledBlocks.includes(block!.type))) {
          return el;
        }

        return (
          <>
            {el}
            <ToolbarComponent collapsedTools={collapsedTools} expandedTools={expandedTools} editor={editor} />
          </>
        );
      }
    });
  }
};
