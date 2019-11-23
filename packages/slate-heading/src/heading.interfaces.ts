import { HEADING_LEVELS } from './heading.constants';

export interface HeadingConfigEnabled {
  /**
   * The whitelist of heading levels.
   */
  enabled: HEADING_LEVELS[];
}
