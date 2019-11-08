import React from 'react';
import { PickPluginAndRequired } from '@artibox/slate-core';
import { Tool } from './toolbar.types';
import Toolbar from './components/toolbar';
import './styles';

export interface ToolbarPluginConfig {
  collapsedTools?: Tool[];
  expandedTools?: Tool[];
}

export type ToolbarPlugin = PickPluginAndRequired<'renderEditor'>;

export function ToolbarPlugin(config: ToolbarPluginConfig): ToolbarPlugin {
  const { collapsedTools, expandedTools } = config;

  return {
    renderEditor: (_, editor, next) => {
      const { fragment, selection } = editor.value;
      const { isFocused, isExpanded } = selection;
      const focusTextEmpty = fragment.text === '';

      if (!isFocused) {
        return next();
      }

      if (isExpanded && !focusTextEmpty && expandedTools) {
        return (
          <>
            {next()}
            <Toolbar tools={expandedTools} editor={editor} expanded />
          </>
        );
      } else if (!isExpanded && collapsedTools) {
        return (
          <>
            {next()}
            <Toolbar tools={collapsedTools} editor={editor} />
          </>
        );
      }

      return next();
    }
  };
}
