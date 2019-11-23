import { Editor } from 'slate';
import React, { ReactNode } from 'react';
import { CommonInlineRendererConfig, CommonInlineRenderer, CommonEditorRenderer } from '@artibox/slate-common';
import { LINK_TYPE } from './link.constants';
import { getUrlFromInline } from './link.utils';
import Link, { LinkProps } from './link.component';
import LinkModalProvider, { LinkModalProviderProps } from './link-modal/link-modal.provider';

export type LinkRendererRenderModal = (
  editor: Editor,
  ...args: Parameters<LinkModalProviderProps['children']>
) => ReactNode;

export interface LinkRendererConfig extends Partial<Pick<CommonInlineRendererConfig<LinkProps>, 'type' | 'component'>> {
  renderModal?: LinkRendererRenderModal;
}

export type LinkRenderer = CommonInlineRenderer | (CommonInlineRenderer & CommonEditorRenderer);

export function LinkRenderer(config?: LinkRendererConfig): LinkRenderer {
  const { type = LINK_TYPE, renderModal, component = Link } = config || {};
  const inlineRenderer = CommonInlineRenderer({
    type,
    component,
    getProps: props => ({
      href: getUrlFromInline(props.node),
      target: '_blank'
    })
  });

  if (!renderModal) {
    return inlineRenderer;
  }

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
