import React from 'react';
import { Editor } from 'slate';
import { ForPlugin } from '@artibox/slate-common';
import { createCommonEditorRenderer } from '@artibox/slate-common/renderers/common-editor';
import { Tool } from './typings';
import ToolbarComponent from './components/toolbar';
import './styles';

export interface ToolbarForPluginConfig {
  /**
   * The blacklist of nodes.
   * If some nodes in the current selection is in the blacklist, toolbar will hide.
   */
  disabledBlocks?: ReadonlyArray<string>;
  disabledInlines?: ReadonlyArray<string>;
  collapsedTools?: ReadonlyArray<Tool> | ((editor: Editor) => ReadonlyArray<Tool>);
  expandedTools?: ReadonlyArray<Tool> | ((editor: Editor) => ReadonlyArray<Tool>);
}

export type Toolbar = ForPlugin<ToolbarForPluginConfig>;

export const Toolbar: Toolbar = {
  forPlugin(config) {
    const {
      collapsedTools: collapsedToolsOrGetter,
      expandedTools: expandedToolsOrGetter,
      disabledBlocks,
      disabledInlines
    } = config || {};

    return createCommonEditorRenderer({
      render(editor, el) {
        if (
          (disabledBlocks && editor.value.blocks.some(block => disabledBlocks.includes(block!.type))) ||
          (disabledInlines && editor.value.inlines.some(inline => disabledInlines.includes(inline!.type)))
        ) {
          return el;
        }

        let collapsedTools =
          typeof collapsedToolsOrGetter === 'function' ? collapsedToolsOrGetter(editor) : collapsedToolsOrGetter;
        collapsedTools = collapsedTools && collapsedTools.length ? collapsedTools : undefined;
        let expandedTools =
          typeof expandedToolsOrGetter === 'function' ? expandedToolsOrGetter(editor) : expandedToolsOrGetter;
        expandedTools = expandedTools && expandedTools.length ? expandedTools : undefined;

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
