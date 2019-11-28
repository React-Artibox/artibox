import { IconDefinition } from '@artibox/icons';
import { ToolHook } from '@artibox/slate-common';
import { TOOLBAR_DIVIDER } from './constants';

export type Tool =
  | TOOLBAR_DIVIDER
  | {
      icon: IconDefinition;
      hook: ToolHook;
    };
