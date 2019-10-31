import { createUseHeadingIsActive, createUseHeadingOnClick } from './heading-hooks.factory';
import {
  HEADING_1_QUERY_HAS,
  HEADING_1_COMMAND_TOGGLE,
  HEADING_2_QUERY_HAS,
  HEADING_2_COMMAND_TOGGLE,
  HEADING_3_QUERY_HAS,
  HEADING_3_COMMAND_TOGGLE,
  HEADING_4_QUERY_HAS,
  HEADING_4_COMMAND_TOGGLE,
  HEADING_5_QUERY_HAS,
  HEADING_5_COMMAND_TOGGLE,
  HEADING_6_QUERY_HAS,
  HEADING_6_COMMAND_TOGGLE
} from './heading.constants';

export const useHeading1IsActive = createUseHeadingIsActive(HEADING_1_QUERY_HAS);
export const useHeading1OnClick = createUseHeadingOnClick(HEADING_1_COMMAND_TOGGLE);
export const useHeading2IsActive = createUseHeadingIsActive(HEADING_2_QUERY_HAS);
export const useHeading2OnClick = createUseHeadingOnClick(HEADING_2_COMMAND_TOGGLE);
export const useHeading3IsActive = createUseHeadingIsActive(HEADING_3_QUERY_HAS);
export const useHeading3OnClick = createUseHeadingOnClick(HEADING_3_COMMAND_TOGGLE);
export const useHeading4IsActive = createUseHeadingIsActive(HEADING_4_QUERY_HAS);
export const useHeading4OnClick = createUseHeadingOnClick(HEADING_4_COMMAND_TOGGLE);
export const useHeading5IsActive = createUseHeadingIsActive(HEADING_5_QUERY_HAS);
export const useHeading5OnClick = createUseHeadingOnClick(HEADING_5_COMMAND_TOGGLE);
export const useHeading6IsActive = createUseHeadingIsActive(HEADING_6_QUERY_HAS);
export const useHeading6OnClick = createUseHeadingOnClick(HEADING_6_COMMAND_TOGGLE);
