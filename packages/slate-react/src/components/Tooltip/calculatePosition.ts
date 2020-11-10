import { TooltipProps } from './typings';

function isContainerAsDocument(container: HTMLElement) {
  return container === document.documentElement || container === document.body;
}

function getTargetRect(container: HTMLElement, targetEl: HTMLElement) {
  const triggerRect = targetEl.getBoundingClientRect();

  if (isContainerAsDocument(container)) {
    return triggerRect;
  }

  const containerRect = container.getBoundingClientRect();

  const { width, height } = triggerRect;
  const top = triggerRect.top - containerRect.top;
  const left = triggerRect.left - containerRect.left;

  return {
    width,
    height,
    top,
    bottom: top + height,
    left,
    right: left + width
  };
}

function getScrollLeftAndTop(container: HTMLElement) {
  const isAsDocument = isContainerAsDocument(container);

  return {
    scrollTop: isAsDocument ? document.documentElement.scrollTop + document.body.scrollTop : container.scrollTop,
    scrollLeft: isAsDocument ? document.documentElement.scrollLeft + document.body.scrollLeft : container.scrollLeft
  };
}

export function calculatePosition(
  props: Required<Pick<TooltipProps, 'placement' | 'getContainer' | 'horizontalOffset' | 'verticalOffset'>>,
  triggerEl: HTMLElement,
  popupEl: HTMLElement
) {
  const { placement, getContainer, horizontalOffset, verticalOffset } = props;
  const isTop = placement.includes('top');
  const isBottom = placement.includes('bottom');
  const isLeft = placement.includes('left');
  const isRight = placement.includes('right');

  const container = getContainer();
  const triggerRect = getTargetRect(container, triggerEl);
  const { width: popupWidth, height: popupHeight } = popupEl.getBoundingClientRect();
  let { scrollTop: top, scrollLeft: left } = getScrollLeftAndTop(container);

  /**
   * position
   */
  if (isLeft) {
    left += triggerRect.left;
  } else if (isRight) {
    left += triggerRect.right - popupWidth;
  } else {
    left += triggerRect.left + (triggerRect.width - popupWidth) / 2;
  }

  if (isTop) {
    top += triggerRect.top - popupHeight;
  } else if (isBottom) {
    top += triggerRect.bottom;
  } else {
    top += triggerRect.top + (triggerRect.height - popupHeight) / 2;
    left += isLeft ? -popupWidth : popupWidth;
  }

  /**
   * offset
   */
  top += isTop ? -verticalOffset : verticalOffset;
  left += isLeft ? -horizontalOffset : horizontalOffset;

  return { top, left };
}
