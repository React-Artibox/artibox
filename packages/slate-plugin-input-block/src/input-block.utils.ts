import { getCommand } from '@artibox/slate-core';
import { INPUT_BLOCK_COMMAND_START } from './input-block.constants';
import { InputBlockCommandStart } from './input-block.commands';

export const inputBlockStart: InputBlockCommandStart = (editor, config) =>
  getCommand<InputBlockCommandStart>(editor, INPUT_BLOCK_COMMAND_START)(config);
