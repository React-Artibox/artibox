import { useCallback } from 'react';
import { HasNodeType, ToolHook, ToolInput } from '@artibox/slate-common';
import { LINK_TYPE } from './link.constants';
import { LinkController } from './link.controller';
import { LinkRendererConfig, LinkRenderer } from './link.renderer';
import { LinkSchema } from './link.schemta';

export type LinkCreateConfig = Partial<HasNodeType>;

export type LinkForPluginConfig = LinkRendererConfig;

export interface LinkForToolHookConfig {
  action?: 'set' | 'remove';
}

export class Link extends LinkController {
  static create(config?: LinkCreateConfig) {
    const { type = LINK_TYPE } = config || {};
    return new this(type);
  }

  forPlugin(config?: LinkForPluginConfig) {
    const { type } = this;
    const { renderModal } = config || {};
    return {
      ...LinkRenderer({ type, renderModal }),
      schema: LinkSchema({ controller: this })
    } as const;
  }

  forToolHook(config?: LinkForToolHookConfig): ToolHook {
    const { action = 'set' } = config || {};
    const activeProvided = action === 'set';
    const toolInput: ToolInput = {
      getPlaceholder: locale => locale.editor.link.inputPlaceholder,
      onConfirm: this.set
    };

    return (editor, setToolInput) => ({
      active: activeProvided && this.isSelectionIn(editor),
      onMouseDown: useCallback(() => {
        if (action === 'set') {
          setToolInput(toolInput);
        } else if (action === 'remove') {
          this.remove(editor);
        }
      }, [editor])
    });
  }
}
