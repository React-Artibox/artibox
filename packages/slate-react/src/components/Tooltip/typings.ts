import { ReactElement, ReactNode } from 'react';
import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';
import { PortalProps } from '../Portal';

export type TooltipPlacement =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-left'
  | 'top-right'
  | 'right-top'
  | 'right-bottom';

export type TooltipTrigger = 'hover' | 'click';

export interface TooltipProps {
  children?: ReactElement;
  triggers?: TooltipTrigger[];
  popup?: ReactNode;
  getContainer?: PortalProps['getContainer'];
  /**
   * Placement of popup.
   */
  placement?: TooltipPlacement;
  /**
   * Horizontal offset of popup between trigger.
   */
  horizontalOffset?: number;
  /**
   * Vertical offset of popup between trigger.
   */
  verticalOffset?: number;
  /**
   * classNames props of CSSTransition in react-transition-group.
   */
  transitionClassNames?: string | CSSTransitionClassNames;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
}
