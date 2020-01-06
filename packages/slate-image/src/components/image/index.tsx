import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { Editor } from 'slate-react';
import { ImagePropsForRenderer } from '../../typings';
import '../../styles';

function isTouchEvent<M, T>(event: M | T): event is T {
  const { touches } = event as any;
  return !!(touches && touches.length);
}

function getEditorWidth(editor: Editor) {
  const el = (editor as any).el as HTMLElement;
  const computedStyle = window.getComputedStyle(el);
  const paddingX = parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
  const borderX = parseFloat(computedStyle.borderLeftWidth) + parseFloat(computedStyle.borderRightWidth);

  return el.clientWidth - paddingX - borderX;
}

function adjustPercentageByThresholds(percentage: number, thresholds: number[]) {
  const lowerIndex = thresholds.findIndex(threshold => threshold >= percentage) - 1;
  const upperIndex = lowerIndex + 1;

  if (lowerIndex < 0) {
    return thresholds[0];
  }

  const lower = thresholds[lowerIndex];

  if (upperIndex === thresholds.length) {
    return lower;
  }

  const upper = thresholds[upperIndex];

  return Math.abs(percentage - lower) <= Math.abs(upper - percentage) ? lower : upper;
}

const moveEvents = ['mousemove', 'touchmove'] as const;
const endEvents = ['mouseup', 'touchend'] as const;

interface ImageResizeStartPoint {
  x: number;
  y: number;
  width: number;
  height: number;
  ratio: number;
}

const Image = forwardRef<HTMLImageElement, ImagePropsForRenderer>(function Image(props, ref) {
  const { children, controller, editor, isSelected, node, src, style, thresholds, ...rest } = props;
  const imageRef = useRef<HTMLImageElement>(null);
  const [startPoint, setStartPoint] = useState<ImageResizeStartPoint | undefined>(undefined);
  const onResizingStart = (event: React.MouseEvent | React.TouchEvent) => {
    const imageEl = imageRef.current;

    if (!imageEl) {
      return;
    }

    const { clientWidth: width, clientHeight: height } = imageEl;
    let x, y;

    if (isTouchEvent<React.MouseEvent, React.TouchEvent>(event)) {
      x = event.touches[0].clientX;
      y = event.touches[0].clientY;
    } else {
      x = event.clientX;
      y = event.clientY;
    }

    setStartPoint({
      x,
      y,
      width,
      height,
      ratio: width / height
    });
  };

  useEffect(() => {
    if (!isSelected || !startPoint) {
      return;
    }

    function onResize(event: MouseEvent | TouchEvent) {
      const { x, y, width, height, ratio } = startPoint!;
      let left, top;

      if (isTouchEvent<MouseEvent, TouchEvent>(event)) {
        left = event.touches[0].clientX - x;
        top = event.touches[0].clientY - y;
      } else {
        left = event.clientX - x;
        top = event.clientY - y;
      }

      let newWidth: number;

      if (Math.abs(left) >= Math.abs(top)) {
        newWidth = width + left;
      } else {
        const newHeight = height + top;
        newWidth = newHeight * ratio;
      }

      let percentage = Math.round((newWidth / getEditorWidth(editor)) * 100);

      if (percentage < 0) {
        percentage = 0;
      } else if (percentage > 100) {
        percentage = 100;
      }

      if (thresholds) {
        percentage = adjustPercentageByThresholds(percentage, thresholds);
      }

      controller.resize(editor as any, node, percentage);
    }

    function onCancelResize() {
      setStartPoint(undefined);
    }

    moveEvents.forEach(moveEvent => document.addEventListener(moveEvent, onResize));
    endEvents.forEach(endEvent => document.addEventListener(endEvent, onCancelResize));

    return () => {
      moveEvents.forEach(moveEvent => document.removeEventListener(moveEvent, onResize));
      endEvents.forEach(endEvent => document.removeEventListener(endEvent, onCancelResize));
    };
  }, [startPoint, editor, controller, isSelected, node, thresholds]);

  return (
    <div ref={ref} className="artibox-slate-image__wrapper" style={style} {...rest}>
      {isSelected && (
        <>
          <span className="artibox-slate-image__boundary" />
          <span className="artibox-slate-image__resizer" onMouseDown={onResizingStart} onTouchStart={onResizingStart} />
        </>
      )}
      <img ref={imageRef} className="artibox-slate-image" src={src} />
    </div>
  );
});

export default Image;
