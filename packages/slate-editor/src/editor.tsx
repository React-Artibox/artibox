import React, { forwardRef } from 'react';
import { BasicEditorProps, Editor } from 'slate-react';
import { Plugin, Container } from '@artibox/slate-core';
import { ContainerContext } from './container/container.context';

export interface ArtiboxSlateEditorProps<Q = any, C = any> extends Omit<BasicEditorProps, 'plugins'> {
  container: Container<Q, C>;
  plugins?: Plugin[];
}

export const ArtiboxSlateEditor = forwardRef<Editor, ArtiboxSlateEditorProps>(({ container, ...props }, ref) => (
  <ContainerContext.Provider value={container}>
    <Editor ref={ref} {...props} />
  </ContainerContext.Provider>
));
