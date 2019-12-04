import { useCallback } from 'react';
import { NodeType, InputConfig, ForPlugin, ForToolHook } from '@artibox/slate-common';
import { LINK_TYPE } from './constants';
import { LinkController, createLinkController } from './controller';
import { CreateLinkRendererConfig, createLinkRenderer } from './renderer';
import { createLinkSchema } from './schemta';
import Link from './components/link';

export type LinkForPluginConfig = CreateLinkRendererConfig;

export interface LinkForToolHookConfig {
  /**
   * The command of controller of link will be triggered after clicked.
   */
  command?: 'set' | 'remove';
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
      const { component = Link, renderModal } = config || {};
      return {
        ...createLinkRenderer({ type, component, renderModal }),
        schema: createLinkSchema({ type, controller })
      };
    },
    forToolHook(config?: LinkForToolHookConfig) {
      const { command = 'set' } = config || {};
      const activeProvided = command === 'set';
      const inputConfig: InputConfig = {
        getPlaceholder: locale => locale.editor.link.inputPlaceholder,
        onConfirm: controller.set
      };

      return (editor, setInputConfig) => ({
        active: activeProvided && controller.isSelectionIn(editor),
        onMouseDown: useCallback(() => {
          if (command === 'set') {
            setInputConfig(inputConfig);
          } else if (command === 'remove') {
            controller.remove(editor);
          }
        }, [editor])
      });
    }
  };
}
