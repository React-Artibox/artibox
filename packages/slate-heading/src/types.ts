import { RenderAttributes } from 'slate-react';
import { HEADING_LEVELS } from './constants';

export type HeadingLevel = typeof HEADING_LEVELS[number];

export interface HeadingProps extends RenderAttributes {
  level?: HeadingLevel;
}

export interface HeadingConfigEnabled {
  /**
   * The whitelist of heading levels.
   */
  enabled: HeadingLevel[];
}
