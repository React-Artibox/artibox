import { Editor, SchemaProperties } from 'slate';
import { PARAGRAPH_TYPE } from '@artibox/slate-core';
import { RendererBaseComponent, CommonBlockRenderer } from '@artibox/slate-renderer';
import { SEPARATION_LINE_TYPE, SEPARATION_LINE_COMPONENT } from './separation-line.constants';
import { SeparationLineSchema } from './separation-line.schema';

export interface SeparationLineConfig {
  type?: string;
  component?: RendererBaseComponent;
}

export class SeparationLine {
  static create(config?: SeparationLineConfig) {
    const type = config?.type ?? SEPARATION_LINE_TYPE;
    const component = config?.component ?? SEPARATION_LINE_COMPONENT;
    const renderer = CommonBlockRenderer({ type, component, isVoid: true });
    const schema = SeparationLineSchema(type);

    return new this(type, renderer, schema);
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

  addSeparationLine = (editor: Editor): Editor =>
    editor
      .insertBlock(this.type)
      .insertBlock(PARAGRAPH_TYPE)
      .moveToStartOfBlock();
}
