import { useEffect, useRef, useState } from 'react';
import { ReactEditor, useEditor, useFocused, useSelected } from 'slate-react';
import { ImageElement } from '@artibox/slate-common/image';
import { ReactImage } from '../typings';

function isTouchEvent<M, T>(event: M | T): event is T {
  const { touches } = event as any;
  return !!(touches && touches.length);
}

function getEditorWidth(editor: ReactEditor) {
  const el = ReactEditor.toDOMNode(editor, editor);
  const computedStyle = window.getComputedStyle(el);
  const paddingX = parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
  const borderX = parseFloat(computedStyle.borderLeftWidth) + parseFloat(computedStyle.borderRightWidth);

  return el.clientWidth - paddingX - borderX;
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

export function useImageResizer(element: ImageElement, resizeImage: ReactImage<any>['resizeImage']) {
  const editor = useEditor();
  const focused = useFocused();
  const selected = useSelected();
  const focusedAndSelected = focused && selected;
  const imageRef = useRef<HTMLImageElement>(null);
  const [startPoint, setStartPoint] = useState<ImageResizeStartPoint | undefined>(undefined);
  const onResizeStart = (event: React.MouseEvent | React.TouchEvent) => {
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
    if (!focusedAndSelected || !startPoint) {
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

      const percentage = Math.round((newWidth / getEditorWidth(editor)) * 100);

      resizeImage(editor, [element, ReactEditor.findPath(editor, element)], percentage);
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
  }, [editor, element, focusedAndSelected, resizeImage, startPoint]);

  return {
    imageRef,
    focusedAndSelected,
    onResizeStart
  };
}
