import React, { forwardRef } from 'react';
import cx from 'classnames';
import { ImageFigurePropsForRenderer } from '@artibox/slate-image/typings';
import '../../styles';

const ImageFigure = forwardRef<HTMLImageElement, ImageFigurePropsForRenderer>(function ImageFigure(props, ref) {
  const { children, isBlurred, ...rest } = props;

  return (
    <figure
      ref={ref}
      className={cx('artibox-slate-image__figure', {
        'artibox-slate-image__figure--blurred': isBlurred
      })}
      {...rest}
    >
      {children}
    </figure>
  );
});

export default ImageFigure;
