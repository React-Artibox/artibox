import React from 'react';
import { BasicEditorProps, Editor } from 'slate-react';
import { ResolvedModules } from '@artibox/slate-core';
import { QueriesContext } from './contexts/queries.context';
import { CommandsContext } from './contexts/commands.context';

export interface ArtiboxSlateEditorProps<Q extends string, C extends string> extends Omit<BasicEditorProps, 'plugins'> {
  resolvedModules: ResolvedModules<Q, C>;
}

export function ArtiboxSlateEditor<Q extends string, C extends string>({
  resolvedModules,
  ...props
}: ArtiboxSlateEditorProps<Q, C>) {
  const { plugins, queries, commands } = resolvedModules;

  return (
    <QueriesContext.Provider value={queries}>
      <CommandsContext.Provider value={commands}>
        <Editor {...props} plugins={plugins} />
      </CommandsContext.Provider>
    </QueriesContext.Provider>
  );
}
