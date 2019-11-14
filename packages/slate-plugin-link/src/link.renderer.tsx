import { Editor } from 'slate';
import React, { ReactNode } from 'react';
import { CommonInlineRenderer, CommonEditorRenderer } from '@artibox/slate-renderer';
import { LINK_COMPONENT } from './link.constants';
import { getUrlFromInline } from './link.utils';
import LinkModalProvider, { LinkModalProviderProps } from './link-modal/link-modal.provider';
import LinkModal from './link-modal/link-modal.component';

export interface LinkRendererConfig {
  type: string;
  renderLinkModal?: (editor: Editor, ...args: Parameters<LinkModalProviderProps['children']>) => ReactNode;
}

export type LinkRenderer = CommonInlineRenderer & CommonEditorRenderer;

export function LinkRenderer(config: LinkRendererConfig): LinkRenderer {
  const { type, renderLinkModal } = config;
  const inlineRenderer = CommonInlineRenderer({
    type,
    component: LINK_COMPONENT,
    getProps: props => ({
      href: getUrlFromInline(props.node),
      target: '_blank'
    })
  });
  const editorRenderer = CommonEditorRenderer({
    render: (editor, el) => (
      <LinkModalProvider>
        {(open, setOpen) => (
          <>
            {renderLinkModal?.(editor, open, setOpen) ?? <LinkModal editor={editor} open={open} setOpen={setOpen} />}
            {el}
          </>
        )}
      </LinkModalProvider>
    )
  });

  return { ...inlineRenderer, ...editorRenderer };
}
