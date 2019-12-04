import { Editor } from 'slate';
import { Plugin } from 'slate-react';
import React, { ReactNode } from 'react';
import {
  CreateCommonInlineRendererConfig,
  createCommonInlineRenderer
} from '@artibox/slate-common/renderers/common-inline';
import { createCommonEditorRenderer } from '@artibox/slate-common/renderers/common-editor';
import { getLinkPropsFromInline } from './utils/get-link-props-from-inline';
import { LinkProps } from './typings';
import LinkModalProvider, { LinkModalProviderProps } from './components/link-modal/link-modal-provider';

export type LinkRendererRenderModal = (
  editor: Editor,
  ...args: Parameters<LinkModalProviderProps['children']>
) => ReactNode;

export interface CreateLinkRendererConfig
  extends Pick<CreateCommonInlineRendererConfig<LinkProps>, 'type' | 'component'> {
  renderModal?: LinkRendererRenderModal;
}

export function createLinkRenderer(config: CreateLinkRendererConfig): Plugin {
  const { type, renderModal, component } = config;
  const inlineRenderer = createCommonInlineRenderer({
    type,
    component,
    getProps: props => getLinkPropsFromInline(props.node)
  });

  if (!renderModal) {
    return inlineRenderer;
  }

  const editorRenderer = createCommonEditorRenderer({
    render: (editor, el) => (
      <LinkModalProvider>
        {(open, setOpen) => (
          <>
            {renderModal(editor, open, setOpen)}
            {el}
          </>
        )}
      </LinkModalProvider>
    )
  });

  return { ...inlineRenderer, ...editorRenderer };
}
