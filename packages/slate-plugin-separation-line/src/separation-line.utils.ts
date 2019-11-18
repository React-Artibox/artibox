import { getCommand } from '@artibox/slate-core';
import { SEPARATION_LINE_COMMAND_ADD } from './separation-line.constants';
import { SeparationLineCommandAdd } from './separation-line.commands';

export const separationLineAdd: SeparationLineCommandAdd = editor =>
  getCommand<SeparationLineCommandAdd>(editor, SEPARATION_LINE_COMMAND_ADD)();
