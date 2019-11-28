import { useCallback } from 'react';
import { NodeType, InputData, ForPlugin, ForToolHook } from '@artibox/slate-common';
import { LINK_TYPE } from './constants';
import { LinkController, createLinkController } from './controller';
import { CreateLinkRendererConfig, createLinkRenderer } from './renderer';
import { createLinkSchema } from './schemta';

export type LinkForPluginConfig = CreateLinkRendererConfig;

export interface LinkForToolHookConfig {
  action?: 'set' | 'remove';
}
export type Link = NodeType & LinkController & ForPlugin<LinkForPluginConfig> & ForToolHook<LinkForToolHookConfig>;

export type CreateLinkConfig = Partial<NodeType>;

export function createLink(config?: CreateLinkConfig): Link {
  const { type = LINK_TYPE } = config || {};
  const controller = createLinkController({ type });
  return {
    type,
    ...controller,
    forPlugin(config) {
      const { renderModal } = config || {};
      return {
        ...createLinkRenderer({ type, renderModal }),
        schema: createLinkSchema({ type, controller })
      };
    },
    forToolHook(config?: LinkForToolHookConfig) {
      const { action = 'set' } = config || {};
      const activeProvided = action === 'set';
      const toolInput: InputData = {
        getPlaceholder: locale => locale.editor.link.inputPlaceholder,
        onConfirm: controller.set
      };

      return (editor, setToolInput) => ({
        active: activeProvided && controller.isSelectionIn(editor),
        onMouseDown: useCallback(() => {
          if (action === 'set') {
            setToolInput(toolInput);
          } else if (action === 'remove') {
            controller.remove(editor);
          }
        }, [editor])
      });
    }
  };
}
