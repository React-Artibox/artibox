import { SchemaProperties } from 'slate';
import { RendererBaseComponent, CommonBlockRenderer } from '@artibox/slate-renderer';
import { SEPARATION_LINE_TYPE, SEPARATION_LINE_COMPONENT } from './separation-line.constants';
import { SeparationLineUtils } from './separation-line.utils';
import { SeparationLineSchema } from './separation-line.schema';

export interface SeparationLineConfig {
  type?: string;
  component?: RendererBaseComponent;
}

export class SeparationLine {
  static create(config?: SeparationLineConfig) {
    const type = config?.type ?? SEPARATION_LINE_TYPE;
    const component = config?.component ?? SEPARATION_LINE_COMPONENT;
    const utils = SeparationLineUtils(type);
    const renderer = CommonBlockRenderer({ type, component, isVoid: true });
    const schema = SeparationLineSchema(type);

    return new this(utils, renderer, schema);
  }

  constructor(
    public readonly utils: SeparationLineUtils,
    private readonly renderer: CommonBlockRenderer,
    private readonly schema: SchemaProperties
  ) {}

  get plugin() {
    return { ...this.renderer, schema: this.schema };
  }
}
