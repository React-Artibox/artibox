import React from 'react';
import { useFocused, useSelected } from 'slate-react';
import clsx from 'clsx';
import { RenderImageFigureElementProps } from '../typings';
import './image.styles';

function ImageFigure(props: RenderImageFigureElementProps) {
  const { attributes, children, style } = props;
  const focused = useFocused();
  const selected = useSelected();
  const blurred = !focused || !selected;

  return (
    <figure
      {...attributes}
      className={clsx('artibox-slate-image__figure', {
        'artibox-slate-image__figure--blurred': blurred
      })}
      style={style}
    >
      {children}
    </figure>
  );
}

export default ImageFigure;
