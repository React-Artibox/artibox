import { NodeType, ForPlugin } from '@artibox/slate-common';
import { INPUT_BLOCK_TYPE } from './constants';
import { InputBlockController, createInputBlockContrller } from './controller';
import { createInputBlockHandlers } from './handlers';
import { createInputBlockRenderer } from './renderer';
import { createInputBlockSchema } from './schema';

export type InputBlock = NodeType & InputBlockController & ForPlugin<undefined>;

export type CreateInputBlockConfig = Partial<NodeType>;

export function createInputBlock(config?: CreateInputBlockConfig): InputBlock {
  const { type = INPUT_BLOCK_TYPE } = config || {};
  const controller = createInputBlockContrller({ type });
  return {
    type,
    ...controller,
    forPlugin() {
      return {
        ...createInputBlockHandlers({ controller }),
        ...createInputBlockRenderer({ type }),
        schema: createInputBlockSchema({ type })
      };
    }
  };
}
