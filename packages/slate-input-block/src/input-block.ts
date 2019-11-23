import { HasNodeType } from '@artibox/slate-common';
import { INPUT_BLOCK_TYPE } from './input-block.constants';
import { InputBlockController } from './input-block.controller';
import { InputBlockHandlers } from './input-block.handlers';
import { InputblockRenderer } from './input-block.renderer';
import { InputBlockSchema } from './input-block.schema';

export type InputBlockCreateConfig = Partial<HasNodeType>;

export class InputBlock extends InputBlockController {
  static create(config?: InputBlockCreateConfig) {
    const { type = INPUT_BLOCK_TYPE } = config || {};
    return new this(type);
  }

  forPlugin() {
    const { type } = this;
    return {
      ...InputBlockHandlers({ controller: this }),
      ...InputblockRenderer({ type }),
      schema: InputBlockSchema({ type })
    } as const;
  }
}
