import { useCallback } from 'react';
import { NodeType, ForPlugin, ForToolHook } from '@artibox/slate-common';
import { SEPARATION_LINE_TYPE, SEPARATION_LINE_COMPONENT } from './constants';
import { SeparationLineController, createSeparationLineController } from './controller';
import { CreateSeparationLineRendererConfig, createSeparationLineRenderer } from './renderer';
import { createSeparationLineSchema } from './schema';

export type CreateSeparationLineConfig = Partial<NodeType>;

export type SeparationLineForPluginConfig = Omit<CreateSeparationLineRendererConfig, 'type'>;

export type SeparationLine = NodeType &
  SeparationLineController &
  ForPlugin<SeparationLineForPluginConfig> &
  ForToolHook<undefined>;

export function createSeparationLine(config?: CreateSeparationLineConfig): SeparationLine {
  const { type = SEPARATION_LINE_TYPE } = config || {};
  const controller = createSeparationLineController({ type });
  return {
    type,
    ...controller,
    forPlugin(config?: SeparationLineForPluginConfig) {
      const { component = SEPARATION_LINE_COMPONENT } = config || {};
      return {
        ...createSeparationLineRenderer({ type, component }),
        schema: createSeparationLineSchema({ type })
      };
    },
    forToolHook: () => editor => ({
      onMouseDown: useCallback(() => controller.add(editor), [editor])
    })
  };
}
