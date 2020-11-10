import { Range } from 'slate';
import { InputWidgetConfig } from '@artibox/slate-common/input-widget';

export interface ToolInputConfig extends InputWidgetConfig {
  currentSelection: Range | null;
}

export type StartToolInput = (config: InputWidgetConfig) => void;
