import { Editor } from 'slate';
import React, { ReactNode } from 'react';
import { CommonInlineRenderer, CommonEditorRenderer } from '@artibox/slate-renderer';
import { LINK_COMPONENT } from './link.constants';
import { LinkController } from './link.interfaces';
import { getUrlFromInline } from './link.utils';
import LinkModalProvider, { LinkModalProviderProps } from './link-modal/link-modal.provider';
import LinkModal from './link-modal/link-modal.component';

export type LinkRendererRenderModal = (
  editor: Editor,
  ...args: Parameters<LinkModalProviderProps['children']>
) => ReactNode;

export interface LinkRendererConfig {
  type: string;
  controller: LinkController;
  modal?: boolean | LinkRendererRenderModal;
}

export type LinkRenderer = CommonInlineRenderer | (CommonInlineRenderer & CommonEditorRenderer);

export function LinkRenderer(config: LinkRendererConfig): LinkRenderer {
  const { type, modal = false, controller } = config;
  const inlineRenderer = CommonInlineRenderer({
    type,
    component: LINK_COMPONENT,
    getProps: props => ({
      href: getUrlFromInline(props.node),
      target: '_blank'
    })
  });

  if (!modal) {
    return inlineRenderer;
  }

  const renderModal: LinkRendererRenderModal =
    typeof modal !== 'function'
      ? (editor, open, setOpen) => <LinkModal controller={controller} editor={editor} open={open} setOpen={setOpen} />
      : modal;

  const editorRenderer = CommonEditorRenderer({
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
