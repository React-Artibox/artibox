import React, {
  HTMLAttributes,
  ReactElement,
  SetStateAction,
  Children,
  cloneElement,
  useContext,
  useRef,
  useState,
  useCallback,
  useLayoutEffect
} from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';
import clsx from 'clsx';
import { composeRefs } from '../../utils/composeRefs';
import { ThemeContext } from '../../configs';
import Portal from '../Portal';
import { TooltipTrigger, TooltipProps } from './typings';
import { calculatePosition } from './calculatePosition';
import './tooltip.styles';

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
function Tooltip({
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
}: TooltipProps) {
  const { props: themeProps } = useContext(ThemeContext);
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
    triggerProps.onClick = event => {
      delaySetVisible(prevVisible => !prevVisible, 0);
      child.props.onClick?.(event);
    };
  }

  if (triggers.includes('hover')) {
    popupProps.onMouseEnter = clearDelayTimer;
    popupProps.onMouseLeave = event => {
      if (!(event.relatedTarget instanceof Node && popupRef.current?.contains(event.relatedTarget))) {
        delaySetVisible(false, mouseLeaveDelay);
      }
    };
    triggerProps.onMouseEnter = event => {
      delaySetVisible(true, mouseEnterDelay);
      child.props.onMouseEnter?.(event);
    };
    triggerProps.onMouseLeave = event => {
      delaySetVisible(false, mouseLeaveDelay);
      child.props.onMouseLeave?.(event);
    };
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
              className={clsx(themeProps.className, `${clsPrefix}__popup`, `${clsPrefix}__popup--${firstPlacement}`)}
              ref={popupRef}
              style={themeProps.style}
              {...popupProps}
            >
              <div
                className={clsx(`${clsPrefix}__arrow`, `${clsPrefix}__arrow--${firstPlacement}`, {
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
}

export default Tooltip;
