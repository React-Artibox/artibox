import React, {
  FC,
  HTMLAttributes,
  ReactElement,
  SetStateAction,
  Children,
  cloneElement,
  useRef,
  useState,
  useCallback,
  useLayoutEffect
} from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';
import cx from 'classnames';
import Portal from '../Portal';
import { TooltipTrigger, TooltipProps } from './types';
import { composeRefs } from '../utils/compose-refs';
import { composeEventHandlers } from '../utils/compose-event-handlers';
import { calculatePosition } from './calculate-position';
import './styles';

const clsPrefix = 'artibox-tooltip';

const defaultTriggers: TooltipTrigger[] = ['hover'];
const defaultGetContainer = () => document.body;
const defaultTransitionClassNames: CSSTransitionClassNames = {
  enter: `${clsPrefix}__fade--enter`,
  enterActive: `${clsPrefix}__fade--enter-active`,
  exit: `${clsPrefix}__fade--exit`,
  exitActive: `${clsPrefix}__fade--exit-active`
};

/**
 * @todo
 * To implement all placement.
 * Extract Popup from Tooltip.
 */
const Tooltip: FC<TooltipProps> = ({
  children,
  triggers = defaultTriggers,
  popup,
  getContainer = defaultGetContainer,
  placement = 'top',
  horizontalOffset = 0,
  verticalOffset = 0,
  transitionClassNames = defaultTransitionClassNames,
  mouseEnterDelay = 0,
  mouseLeaveDelay = 0.1
}) => {
  const [visible, setVisible] = useState(false);
  const delayTimer = useRef(NaN);
  const clearDelayTimer = useCallback(() => {
    if (delayTimer.current) {
      window.clearTimeout(delayTimer.current);
      delayTimer.current = NaN;
    }
  }, []);
  const delaySetVisible = useCallback(
    (setVisibleAction: SetStateAction<boolean>, delay: number) => {
      clearDelayTimer();

      if (delay) {
        delayTimer.current = window.setTimeout(() => {
          setVisible(setVisibleAction);
          clearDelayTimer();
        }, delay * 1000);
      } else {
        setVisible(setVisibleAction);
      }
    },
    [clearDelayTimer]
  );
  const triggerRef = useRef<HTMLElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [firstPlacement, secondPlacement] = placement.split('-');
  const child = Children.only(children) as ReactElement;
  const triggerProps: HTMLAttributes<HTMLElement> = {};
  const popupProps: HTMLAttributes<HTMLDivElement> = {};

  if (triggers.includes('click')) {
    const toggle = () => delaySetVisible(prevVisible => !prevVisible, 0);
    triggerProps.onClick = composeEventHandlers([toggle, child.props.onClick]);
  }

  if (triggers.includes('hover')) {
    popupProps.onMouseEnter = clearDelayTimer;
    popupProps.onMouseLeave = event => {
      if (!(event.relatedTarget instanceof Node && popupRef.current?.contains(event.relatedTarget))) {
        delaySetVisible(false, mouseLeaveDelay);
      }
    };
    triggerProps.onMouseEnter = composeEventHandlers([
      child.props.onMouseEnter,
      () => delaySetVisible(true, mouseEnterDelay)
    ]);
    triggerProps.onMouseLeave = composeEventHandlers([
      child.props.onMouseLeave,
      () => delaySetVisible(false, mouseLeaveDelay)
    ]);
  }

  const trigger = cloneElement(child, { ...triggerProps, ref: composeRefs([triggerRef, (child as any).ref]) });

  useLayoutEffect(() => {
    const triggerEl = triggerRef.current;
    const popupEl = popupRef.current;

    if (!(visible && triggerEl && popupEl)) {
      return;
    }

    const { top, left } = calculatePosition(
      { placement, getContainer, horizontalOffset, verticalOffset },
      triggerEl,
      popupEl
    );

    popupEl.style.top = `${top}px`;
    popupEl.style.left = `${left}px`;
  }, [visible, placement, getContainer, horizontalOffset, verticalOffset]);

  useLayoutEffect(() => {
    if (!visible) {
      return;
    }

    function clickOutSideHandler(event: MouseEvent) {
      event.preventDefault();

      const popupEl = popupRef.current;
      const targetEl = event.target as HTMLElement;
      const targetUnmount = targetEl.offsetParent === null;

      if (!(popupEl?.contains(targetEl) || targetUnmount)) {
        setVisible(false);
      }
    }

    document.addEventListener('click', clickOutSideHandler);

    return () => {
      document.removeEventListener('click', clickOutSideHandler);
    };
  }, [visible]);

  return (
    <>
      <Portal getContainer={getContainer}>
        <CSSTransition in={visible} classNames={transitionClassNames} timeout={200} unmountOnExit>
          <div className={`${clsPrefix}__mask`}>
            <div
              className={cx(`${clsPrefix}__popup`, `${clsPrefix}__popup--${firstPlacement}`)}
              ref={popupRef}
              {...popupProps}
            >
              <div
                className={cx(`${clsPrefix}__arrow`, `${clsPrefix}__arrow--${firstPlacement}`, {
                  [`${clsPrefix}__arrow--${placement}`]: secondPlacement
                })}
              />
              <div className={`${clsPrefix}__content`}>{popup}</div>
            </div>
          </div>
        </CSSTransition>
      </Portal>
      {trigger}
    </>
  );
};

export default Tooltip;
