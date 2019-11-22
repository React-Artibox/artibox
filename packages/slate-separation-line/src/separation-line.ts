import { SchemaProperties } from 'slate';
import { PARAGRAPH_TYPE, RendererBaseComponent, CommonBlockRenderer } from '@artibox/slate-common';
import { SEPARATION_LINE_TYPE, SEPARATION_LINE_COMPONENT } from './separation-line.constants';
import { SeparationLineController } from './separation-line.interfaces';
import { SeparationLineSchema } from './separation-line.schema';

export interface SeparationLineConfig {
  type?: string;
  component?: RendererBaseComponent;
}

export class SeparationLine implements SeparationLineController {
  static Renderer = CommonBlockRenderer;
  static Schema = SeparationLineSchema;

  static create(config?: SeparationLineConfig) {
    const type = config?.type ?? SEPARATION_LINE_TYPE;
    const component = config?.component ?? SEPARATION_LINE_COMPONENT;

    return new this(type, this.Renderer({ type, component, isVoid: true }), this.Schema(type));
  }

  plugin = {
    ...this.renderer,
    schema: this.schema
  } as const;

  constructor(
    public readonly type: string,
    private readonly renderer: CommonBlockRenderer,
    private readonly schema: SchemaProperties
  ) {}

  addSeparationLineBlock: SeparationLineController['addSeparationLineBlock'] = editor =>
    editor
      .insertBlock(this.type)
      .insertBlock(PARAGRAPH_TYPE)
      .moveToStartOfBlock();
}
