import { Editor } from 'slate';
import React, { ReactNode } from 'react';
import { PickPluginAndRequired } from '@artibox/slate-core';
import { CommonInlineRenderer } from '@artibox/slate-renderer';
import { LINK_COMPONENT } from './link.constants';
import { getUrlFromInline } from './link.utils';
import LinkModalProvider, { LinkModalProviderProps } from './link-modal/link-modal.provider';
import LinkModal from './link-modal/link-modal.component';

export interface LinkRendererConfig {
  type: string;
  renderLinkModal?: (editor: Editor, ...args: Parameters<LinkModalProviderProps['children']>) => ReactNode;
}

export type LinkRenderer = PickPluginAndRequired<'renderInline' | 'renderEditor'>;

export function LinkRenderer(config: LinkRendererConfig): LinkRenderer {
  const { type, renderLinkModal } = config;
  const inlineRenderer = CommonInlineRenderer({
    type,
    component: LINK_COMPONENT,
    dataResolver: node => ({
      href: getUrlFromInline(node),
      target: '_blank'
    })
  });

  return {
    renderInline: inlineRenderer.renderInline,
    renderEditor(_, editor, next) {
      const editorEl = next();

      return (
        <LinkModalProvider>
          {(open, setOpen) => (
            <>
              {renderLinkModal?.(editor, open, setOpen) ?? <LinkModal editor={editor} open={open} setOpen={setOpen} />}
              {editorEl}
            </>
          )}
        </LinkModalProvider>
      );
    }
  };
}
