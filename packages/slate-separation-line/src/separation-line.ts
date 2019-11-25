import { useCallback } from 'react';
import { HasNodeType, ToolHook } from '@artibox/slate-common';
import { SEPARATION_LINE_TYPE } from './separation-line.constants';
import { SeparationLineController } from './separation-line.controller';
import { SeparationLineRendererConfig, SeparationLineRenderer } from './separation-line.renderer';
import { SeparationLineSchema } from './separation-line.schema';

export type SeparationLineCreateConfig = Partial<HasNodeType>;

export type SeparationLineForPluginConfig = Omit<SeparationLineRendererConfig, 'type'>;

export class SeparationLine extends SeparationLineController {
  static create(config?: SeparationLineCreateConfig) {
    const { type = SEPARATION_LINE_TYPE } = config || {};
    return new this(type);
  }

  forPlugin(config?: SeparationLineForPluginConfig) {
    const { type } = this;
    const { component } = config || {};
    return {
      ...SeparationLineRenderer({ type, component }),
      schema: SeparationLineSchema({ type })
    } as const;
  }

  forToolHook(): ToolHook {
    return editor => ({
      onMouseDown: useCallback(() => this.add(editor), [editor])
    });
  }
}
